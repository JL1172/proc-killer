# Welcome to killp

#### **A lightweight package that searches and ends processes for linux/macos** 

## The problem this solves

<p>Have you ever worked on a project and found yourself not being able to interface with node processes? In other words, whether it be using the <code>exec<code> function from node's <code>child process module<code>, automating testing, or just having the need to programmatically control processes because of the lack of interfacing with that process, this simple package solves that problem in a few ways.<p>
<br><br>
<p>Lastly, when I say lack of interfacing I am refering to, primarily, when you, for one use case, run <code>npm run start<code> on a js/ts application and are not able to <code>ctrl + c<code> out of it to consequently end the process.<p>  

# The 3 ways you can use this package 

## 1. ***Method one*** (interactive)

1. Going into the package in node_modules, copying and pasting the code, or cloning the [repo here](https://github.com/JL1172/kill-port)
2. Running `npm install` if cloning the repo
2. Creating a shortcut for your desktop that allows you to run this script and access the prompt based CLI.
   - To assist with this step, I have added pictures/code to walk through the steps of setting this shortcut up to interface with the cli prompts on linux.
   1. First `cd` into this folder and run the command `chmod +x index.ts` (this gives it executable permissions)
   2. Then create a script that invokes this `index.ts`. You can add this file anywhere on your machine, just ensure it is an `.sh` file.
   3. In this .sh file you just created, add the following code:
   ```
    kill-process.sh
   #!/bin/bash
    echo "starting application..."
    cd path/to/this/package
    npm run start
    echo "application successfully run"
   ```
   4. Then proceed to run the `chmod +x kill-process.sh` command to make this file executable.
   5. Lastly, go to `Desktop` directory and create a file named Kill-Process.desktop and paste the following code:
   ```
   [Desktop Entry]
    Name=Kill-Process //(or whatever you want)
    Exec=gnome-terminal -e "path/to/the/.sh/file/you/just/made"
    Type=Application
    Terminal=true
   ```
   6. Now when you go to double click this desktop shortcut, ensure you give it permission to Launch as program when it prompts you, and with that you are done.

* What this does is create a shortcut which executes a script (.sh file) that executes the index.ts file.

## 2. ***Method two***

1. Going into the package in node_modules, copying and pasting the code, or cloning the [repo here](https://github.com/JL1172/kill-port)
2. Running `npm install` if cloning the repo
3. Running one of the following commands:
  - `npm start` with no flags to invoke prompt based interaction with this application
  - `npm start -- --<port>` Will immediately do a search and end process at that port.
  - `npx ts-node index.ts --<port>` same as above except not calling package.json scripts and using ts-node.

## 3. ***Method three***

1. `npm install -g killp`
2. Running from your terminal `killp --<port>` to kill a process

*or* 

1. `npm install killp` to locally install for project
2. `npx killp --<port>`  