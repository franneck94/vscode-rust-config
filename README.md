# VSCode Rust Config

Creates config files for modern Rust projects.  

Following files will be created in the local .vscode folder:

- settings.json: Best default settings for Rust related extensions
- launch.json: Debug config to debug the program

Following files will be created in the root directory:

- .editorconfig: Standard file settings (line-feed, insert new-line, etc.)
- .gitattributes: Gives attributes to pathnames
- .gitignore: Specifies intentionally untracked files to ignore

**Note**: If one of these files already exists, they won't be overridden.

## How to use

Just run the command 'Generate Rust Config Files' in VSCode's command palette.

## Release Notes

Refer to the [CHANGELOG](CHANGELOG.md).

## License

Copyright (C) 2022 Jan Schaffranek.  
Licensed under the [MIT License](LICENSE).
