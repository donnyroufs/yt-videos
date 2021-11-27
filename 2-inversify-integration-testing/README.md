# Simple Typescript Template

## How I use the template

Clone the repo, copy the script somewhere, set an alias in your shell and modify the default paths.
You could also use the github CLI but I can't be bothered to install.

```bash
#!/bin/bash

echo Directory?
read dir

echo Project Name?
read name

cp -R ~/dev/ts-template ~/dev/$dir/$name
cd ~/dev/$dir/$name && code . && git init && yarn

echo copied and installed ts-template to $dir
```

and then simply create a project by using your alias.

1. setup:ts
2. asks for directory: playground
3. asks for folder name: example
4. installs and starts vscode for you :)
