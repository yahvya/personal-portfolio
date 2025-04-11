#[ DEVTOOLS

PROJECT_NAME=Portfolio
GITHUB_ORIGIN=master

#]

#[ PROJET GLOBAL UTILITIES

# print the project init steps and requirements
project-print-init:
	@echo 1. Define the required variable in the devtools makefile
	@echo 2. Define the extra elements to ignore in the .gitignore file
	@echo 3. Create the linked GitHub Project
	@echo 4. Fill the missing elements in the project readme
	@echo 5. Add your custom commands in the makefile
	@echo 6. Launch the 'project-init' command
	@echi 7. Go to configure the project branches protection rules

# create the project initialization branches
project-create-init-branches:
# autotests branch
	git branch autotests
	git switch autotests
	git push --set-upstream origin autotests
	git branch features/autotests/init
	git switch features/autotests/init
	git push --set-upstream origin features/autotests/init
	git switch $(GITHUB_ORIGIN)
# design branch
	git branch design
	git switch design
	git push --set-upstream origin design
	git branch features/design/init
	git switch features/design/init
	git push --set-upstream origin features/design/init
	git switch $(GITHUB_ORIGIN)
# dev branch
	git branch dev
	git switch dev
	git push --set-upstream origin dev
	git branch features/dev/init
	git switch features/dev/init
	git push --set-upstream origin features/dev/init
	git switch $(GITHUB_ORIGIN)
# documentation branch
	git branch documentation
	git switch documentation
	git push --set-upstream origin documentation
	git branch features/documentation/init
	git switch features/documentation/init
	git push --set-upstream origin features/documentation/init
	git switch $(GITHUB_ORIGIN)

# init the project
project-init:	
	@echo Create initialization branches
	@make project-create-init-branches
	@echo Everything is ok
	
#]

#[ DEV COMMAND

# initialize development configuration
dev-init:
	cd ../dev/portfolio && pnpm i && pnpm approve-builds

# launch the development server
dev-launch-dev:
	cd ../dev/portfolio && pnpm run dev

# launch the storybook server
dev-launch-storybook:
	cd ../dev/portfolio && pnpm run storybook

# lint code
dev-lint:
	cd ../dev/portfolio && pnpm run lint --fix

#]