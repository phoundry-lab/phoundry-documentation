---
title: "SDK type reference"
description: "Look up generated TypeScript signatures and members from the current public SDK."
ai_disclosure: true
aliases:
  - references
---

# SDK type reference

This reference documents the public types and helpers for Plugin API `3.0.0`, provided by the `@phoundry/phials-plugin-sdk` package.

Use the workflow guides for permissions, lifecycle consequences, and complete examples. Every declaration below has one canonical page and one owning category.

## Plugin

- [`PluginSettingsComponentProps`](PluginSettingsComponentProps.md)
- [`PhialsPlugin`](PhialsPlugin.md)

## Provider union

- [`PluginProvider`](PluginProvider.md)
- [`ProviderType`](ProviderType.md)

## File viewing and editing

- [`PreviewProvider`](PreviewProvider.md)
- [`PreviewDestination`](PreviewDestination.md)
- [`PreviewSession`](PreviewSession.md)
- [`PreviewSessionFactoryProps`](PreviewSessionFactoryProps.md)
- [`PreviewSurfaceProps`](PreviewSurfaceProps.md)
- [`PreviewToolbarContributionProps`](PreviewToolbarContributionProps.md)
- [`PreviewDestinationCapabilities`](PreviewDestinationCapabilities.md)
- [`ThumbnailIntrinsicDimensions`](ThumbnailIntrinsicDimensions.md)
- [`ThumbnailProvider`](ThumbnailProvider.md)
- [`ThumbnailRenderContext`](ThumbnailRenderContext.md)
- [`ThumbnailRenderResult`](ThumbnailRenderResult.md)
- [`ThumbnailNativeResult`](ThumbnailNativeResult.md)
- [`ThumbnailNativeAccess`](ThumbnailNativeAccess.md)
- [`ThumbnailDirectorySelection`](ThumbnailDirectorySelection.md)
- [`ThumbnailInputDeclaration`](ThumbnailInputDeclaration.md)
- [`ThumbnailContentAccess`](ThumbnailContentAccess.md)
- [`ThumbnailContentSnapshot`](ThumbnailContentSnapshot.md)
- [`ThumbnailRasterFormat`](ThumbnailRasterFormat.md)
- [`ThumbnailHostFeature`](ThumbnailHostFeature.md)
- [`EditorHistoryHandle`](EditorHistoryHandle.md)
- [`PreviewToolbarEditorState`](PreviewToolbarEditorState.md)

## Metadata

- [`MetadataProvider`](MetadataProvider.md)
- [`RawMetadata`](RawMetadata.md)
- [`ExtractedMetadata`](ExtractedMetadata.md)
- [`FileMetadata`](FileMetadata.md)
- [`MetadataSchemaField`](MetadataSchemaField.md)
- [`MetadataSchema`](MetadataSchema.md)
- [`MetadataColumnPolicy`](MetadataColumnPolicy.md)
- [`FilterValueOption`](FilterValueOption.md)
- [`DirectoryMetadataProfileOptions`](DirectoryMetadataProfileOptions.md)
- [`MetadataProviderDirectoryStats`](MetadataProviderDirectoryStats.md)
- [`DirectoryMetadataProfile`](DirectoryMetadataProfile.md)

## File views

- [`FileBrowserViewProvider`](FileBrowserViewProvider.md)
- [`FileBrowserViewProps`](FileBrowserViewProps.md)
- [`ViewColumnDefinition`](ViewColumnDefinition.md)
- [`ViewItemSizePreset`](ViewItemSizePreset.md)

## Panels and tabs

- [`ModuleProvider`](ModuleProvider.md)
- [`ModuleProviderProps`](ModuleProviderProps.md)
- [`ModuleAPI`](ModuleAPI.md)
- [`ModulesAPI`](ModulesAPI.md)
- [`ModuleOpenResult`](ModuleOpenResult.md)
- [`ModulePosition`](ModulePosition.md)
- [`ModuleInstance`](ModuleInstance.md)
- [`ItemShortcutConfig`](ItemShortcutConfig.md)

## Settings and database

- [`PluginSettingsSchema`](PluginSettingsSchema.md)
- [`SettingsField`](SettingsField.md)
- [`SettingsFieldType`](SettingsFieldType.md)
- [`SettingsFieldBase`](SettingsFieldBase.md)
- [`BooleanSettingsField`](BooleanSettingsField.md)
- [`StringSettingsField`](StringSettingsField.md)
- [`NumberSettingsField`](NumberSettingsField.md)
- [`SelectSettingsField`](SelectSettingsField.md)
- [`PathSettingsField`](PathSettingsField.md)
- [`PluginDatabaseSchema`](PluginDatabaseSchema.md)
- [`PluginDatabaseMigration`](PluginDatabaseMigration.md)
- [`PluginDatabaseTransaction`](PluginDatabaseTransaction.md)
- [`PluginDatabaseSchemaOperations`](PluginDatabaseSchemaOperations.md)
- [`PluginTableDefinition`](PluginTableDefinition.md)
- [`PluginColumnDefinition`](PluginColumnDefinition.md)
- [`PluginIndexDefinition`](PluginIndexDefinition.md)
- [`PluginColumnType`](PluginColumnType.md)

## Base and scoped APIs

- [`PluginAPI`](PluginAPI.md)
- [`PreviewAPI`](PreviewAPI.md)
- [`MetadataAPI`](MetadataAPI.md)
- [`ExplorerAPI`](ExplorerAPI.md)
- [`GitAPI`](GitAPI.md)
- [`WorkspaceFoldersAPI`](WorkspaceFoldersAPI.md)
- [`ClipboardAPI`](ClipboardAPI.md)
- [`PluginSettings`](PluginSettings.md)
- [`PluginSettingsChange`](PluginSettingsChange.md)
- [`PluginSettingsSubscription`](PluginSettingsSubscription.md)
- [`PluginStorageAPI`](PluginStorageAPI.md)
- [`PluginSecretsAPI`](PluginSecretsAPI.md)
- [`PluginDatabaseAPI`](PluginDatabaseAPI.md)
- [`DatabaseExecuteResult`](DatabaseExecuteResult.md)
- [`ReadonlyAppSettings`](ReadonlyAppSettings.md)
- [`ModalAPI`](ModalAPI.md)
- [`NotifyAPI`](NotifyAPI.md)
- [`FileUtilsAPI`](FileUtilsAPI.md)
- [`PluginPreparedWrite`](PluginPreparedWrite.md)
- [`PluginTextFileSnapshot`](PluginTextFileSnapshot.md)
- [`PluginTextWriteResult`](PluginTextWriteResult.md)
- [`PluginBinaryFileSnapshot`](PluginBinaryFileSnapshot.md)
- [`PluginBinaryWriteResult`](PluginBinaryWriteResult.md)
- [`PluginDirectoryReadResult`](PluginDirectoryReadResult.md)
- [`PluginPathOutcome`](PluginPathOutcome.md)
- [`PluginFileError`](PluginFileError.md)
- [`PluginFileErrorCode`](PluginFileErrorCode.md)
- [`PluginFileFailure`](PluginFileFailure.md)
- [`PluginDirectoryWatch`](PluginDirectoryWatch.md)
- [`FileMatchAPI`](FileMatchAPI.md)
- [`EventsAPI`](EventsAPI.md)
- [`ViewAPI`](ViewAPI.md)

## Explorer

- [`PluginPaneContext`](PluginPaneContext.md)
- [`PluginPaneListing`](PluginPaneListing.md)
- [`PluginPaneSelection`](PluginPaneSelection.md)
- [`PluginPaneNavigation`](PluginPaneNavigation.md)
- [`PluginPaneView`](PluginPaneView.md)
- [`PluginPaneColumn`](PluginPaneColumn.md)
- [`PluginPaneSort`](PluginPaneSort.md)
- [`PluginPaneWorkspaceFolder`](PluginPaneWorkspaceFolder.md)

## Workspace Folders

- [`WorkspaceFolderSchema`](WorkspaceFolderSchema.md)
- [`WorkspaceFolderPropertyDefinition`](WorkspaceFolderPropertyDefinition.md)
- [`WorkspaceFolderPropertyOption`](WorkspaceFolderPropertyOption.md)
- [`WorkspaceFolderPropertyType`](WorkspaceFolderPropertyType.md)
- [`WorkspaceFolderPropertyValue`](WorkspaceFolderPropertyValue.md)
- [`WorkspaceFolderCalendarValue`](WorkspaceFolderCalendarValue.md)
- [`WorkspaceFolderFileRef`](WorkspaceFolderFileRef.md)
- [`WorkspaceFolderPropertyWrite`](WorkspaceFolderPropertyWrite.md)
- [`KnownWorkspaceFolder`](KnownWorkspaceFolder.md)

## Repository inspection

- [`GitInfo`](GitInfo.md)
- [`GitFileStatus`](GitFileStatus.md)
- [`GitCommit`](GitCommit.md)
- [`GitBranch`](GitBranch.md)
- [`GitDiffOptions`](GitDiffOptions.md)
- [`GitLogOptions`](GitLogOptions.md)
- [`RepositoryLanguage`](RepositoryLanguage.md)
- [`FolderSummary`](FolderSummary.md)

## Commands

- [`CommandContextKey`](CommandContextKey.md)
- [`CommandContext`](CommandContext.md)
- [`CommandShortcut`](CommandShortcut.md)
- [`CommandPlacementArea`](CommandPlacementArea.md)
- [`CommandPlacementBase`](CommandPlacementBase.md)
- [`ContextMenuPlacementConfig`](ContextMenuPlacementConfig.md)
- [`CommandPlacement`](CommandPlacement.md)
- [`Command`](Command.md)
- [`CommandProvider`](CommandProvider.md)

## File model

- [`FileEntry`](FileEntry.md)
- [`FileCategory`](FileCategory.md)
- [`JsonValue`](JsonValue.md)

## Shortcuts

- [`ShortcutDefinition`](ShortcutDefinition.md)
- [`PlatformShortcuts`](PlatformShortcuts.md)

## Events

- [`EventMap`](EventMap.md)
- [`EventHandler`](EventHandler.md)
- [`EventSubscription`](EventSubscription.md)
- [`CoreEvents`](CoreEvents.md)
- [`PluginEvents`](PluginEvents.md)
- [`EventPayload`](EventPayload.md)
- [`ColumnLayoutChangedPayload`](ColumnLayoutChangedPayload.md)
- [`LayoutSettledPayload`](LayoutSettledPayload.md)
- [`LayoutSettledReason`](LayoutSettledReason.md)

## Manifest

- [`PluginManifest`](PluginManifest.md)
- [`PluginPermission`](PluginPermission.md)
- [`PluginIdentity`](PluginIdentity.md)
- [`PluginIdentityProjection`](PluginIdentityProjection.md)
- [`PluginCandidateIdentity`](PluginCandidateIdentity.md)
- [`ValidationResult`](ValidationResult.md)

## Helpers and constants

- [`SUPPORTED_PLUGIN_API_VERSION`](SUPPORTED_PLUGIN_API_VERSION.md)
- [`PERMISSION_DESCRIPTIONS`](PERMISSION_DESCRIPTIONS.md)
- [`PERMISSION_RISK`](PERMISSION_RISK.md)
- [`validateManifest`](validateManifest.md)
- [`parseManifest`](parseManifest.md)
- [`validatePluginId`](validatePluginId.md)
- [`validateSemver`](validateSemver.md)
- [`compareSemver`](compareSemver.md)
- [`satisfiesMinVersion`](satisfiesMinVersion.md)
- [`definePluginManifest`](definePluginManifest.md)
- [`manifestIdentity`](manifestIdentity.md)
- [`validateIdentityProjections`](validateIdentityProjections.md)
- [`definePlugin`](definePlugin.md)
