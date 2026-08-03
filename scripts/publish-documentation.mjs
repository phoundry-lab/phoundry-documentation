#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

function git(...args) {
	return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

if (git('branch', '--show-current') !== 'main') {
	throw new Error('Documentation packages may only be published from main.');
}
if (git('status', '--porcelain')) {
	throw new Error('Documentation packages require a clean working tree.');
}

execFileSync('npm', ['run', 'validate'], { stdio: 'inherit' });

const sha = git('rev-parse', '--short=10', 'HEAD');
const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const base = packageJson.version.split('-')[0];
const version = `${base}-main.${date}.${sha}`;

execFileSync('npm', ['version', version, '--no-git-tag-version'], { stdio: 'inherit' });
try {
	execFileSync('npm', ['publish', '--access', 'public'], { stdio: 'inherit' });
} finally {
	execFileSync('git', ['restore', 'package.json', 'package-lock.json'], { stdio: 'inherit' });
}

