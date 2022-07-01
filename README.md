# Task Enforcer :ledger: :lock:

| Table Of Contents       | link       |
| ------------------------| ---------- |
| About  🔍               | [here](#1) |
| Dev roadmap :golf:      | [here](#2) |
| Running and Debuging 🛠️ | [here](#3) |

## About 🔍 <a name='1'></a>
This extension notifies users to do a certain task and while this task is not completed users will have no access to social media and other websites.

Extension settings include:
 - Task name and completion time
 - Task periodicity
 - Scheduled time
 - List of blockable websites

## Development roadmap :golf: <a name='2'></a>

### Firefox 
 - [x] Implement website blocking / redirect
 - [x] Block based on condition
    - [x] Save blockList config using Storage
 - [x] Create Settings page
    - [x] create Task Table 
    - [x] Store config using Storage API
    - [x] create Task  CRUD
    - [x] create blockable website edit window
    - [x] Sort tasks by time and isActive
 - [x] Create task notification
 - [x] Create interactive Popup
 - [x] Create block notification
 - [ ] make it pretty?
 - [ ] Fix bugs && prepare for Store
 - [ ] Complete Readme


### Chrome
 - [ ] Copy firefox extension
 - [ ] Translate manifest v2 -> v3
    - [ ] Convert  background scripts to non-persistent  

## Running and Debuging 🛠️ <a name="3"></a>

 ### <ins> To run and debug Firefox extension: </ins>
- install web-ext tool  `npm install --global web-ext`
- Move into firefox root directory `cd firefox`
- To test extension run `web-ext run`

### <ins> To inspect extension </ins>
- go to `about:debugging` ➞ `This Firefox` ➞ `taskEnforcer` ➞ `Inspect`
