# 40q Starter Theme
40q Starter Theme is base theme specially created for WPVIP environments.

The theme comes by default with support for:
* Typescript
* Single-file block
* Block handler
* Tailwind

## Installation
1. Install composer packages:
```
composer install
```
2. Install node packages:
```
yarn
```
3.  assets:
```
yarn build
```

## CI/CD
The CI/CD setup (the `.github` folder and `deploy.sh`) is meant to run from the root of a project, not from the theme. Because this is a theme, it won't live at the project root, so when adding it to a project:

- Move the `.github` folder to the root of the project repository.
- Move the `deploy.sh` file as well.
- Add the secret to GitHub under **Settings → Secrets → Actions**.
- Go to the VIP dashboard in Code -> Repository and update the branch name to `<environment>-built`. This must be done per environment.