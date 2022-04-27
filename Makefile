clean:
	rm -rf test/.vscode/launch.json
	rm -rf test/.vscode/settings.json
	rm -f test/.editorconfig
	rm -f test/.gitattributes
	rm -f test/.gitignore

.phony: clean
