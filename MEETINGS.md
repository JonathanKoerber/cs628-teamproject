## CS628 Full Stack Dev Meeting Minuets
#### Teams: Zandra, Aarthi, Inderdeep, Jonathan

#### Metting 3/6/25 Attn(Aathi, Inderdeep, Zandra, Jonathan)

Agenda: 
- TP03
- TP04
  
Things that need to get done (how is doing them):

- Aathi will work on ai page and get TP04 going
- Inderdeep - refactor code agter merge
- Zandra - Finishing up the homepage with signin and singup logic and troubleshoot why it's not connecting to the database. Pending on team's decision on which code we're using for the profile and resume page. Whether to go with Jonathan's or Inderdeep's version. 
- Jonathan: Portfolio, Add fields for user details, merge files, start on tp03

#### Metting 2/28/25 Attn(Aathi, Inderdeep, Zandra, Jonathan)  
agenda: 
-review plan for pt tp03

things that need to get done: 
 
- Review Logic of Nav bar
- Connect resume with database
- Create Resume modelhttps://github.com/JonathanKoerber
- Create Routes for saving resume
- Look into Creating reume component display with diffrent style.
- Create a profile page

#### Metting 2/21/25 Attn(Aathi, Inderdeep, Zandra, Jonathan)

Pre-read TO02

Agenda:

- Review TP02
- Check that everyone has submitted there 

#### Metting 2/14/25 Attn(Aarthi, Inderdeep, Zandra, Jonathan)

Agenda: 
- Make sure everyone has the application built (running on their local)
- Agree on organization of app (model view controller)
- What are people planning to accomplish by TP02, TP03
- What is your timeframe 

___
Aarthi

- Frontend:

  -

- Backend:

  - Resume AI

Inderdeep

- Trouble shoot building the project localy

Zandra

- Trouble shoot building project local

Jonathan:

  - Frontend:
    - Login, Signup, LoginPage,

  - Backend :

    - Model, Controller

  - Build:
    
    - Docker build
TP02 : draft
    
#### Accomplished
We didn't accomplish much. Some of the group are still having issues building the project in their local env. There is 
an error in the login page preventing users to run their section. TP02 is end of week seven. 

##### *Action Items*                                                           
- Aarthi => TP02 draft Thursday. Dev Resume AI.  
- Inderdeep => TP02 draft Thursday build project
- Zandra => TP02 draft. Build project             
- Jonathan => Fix login page. 

#### Meeting: 2/7/24 Attn(Aarthi, Inderdeep, Jonathan, Zandra)

#### Accomplished
Establish best practice for working on code. Zandra and Aarthi explained that we need to work on feature branches 
merge them into main on the remote. Jonathan showed the workflow to incorporate Redux into the system. We will need to 
make a decision, we will need to make a decision. 


#### Meeting": 1/30/25 Attn(Aarthi, Inderdeep, Jonathan, Zandra)
##### Assigned Fechures: 
- Zandara => Questions about docker need to reinstall. Will work on home page.
- Aarthi => Questions about how to work with resume.
- Inderdeep => Work on resume workflow.
- Jonathan => LoginPage and auth. 

#### Accomplished:
Create a context for our project. By next week we will need to understand how the résumé will live in the React app and how
will that data object be passed to the LLM. We had a very productive discussion in this weeks meeting. A number of issue 
were brought up that highlighted a number of issues that we will need to address. We decided to take an other week to create a plan 
to address these issues. 

##### *Action Items*
- Aarthi => plan for how resume data will be passed to LLM
- Inderdeep => plan for user flow entering resume data
- Zandra => Create wireframes, design language for app
- Jonathan => create sign in page, figure out implement JWT, create user page.  

___
#### Meeting: 1/24/25 Attn(Aathi, Jonathan, Zandra)
##### Work Completed:
  - Aarthi => Prof of concept research on how the app will interact with LLM
  - Zandra => Refine user stories for the project. Review TP01.
  - Jonathan => first draft of TP01
##### Accomplished: 
Finalized a project idea. We will be creating an app that will allow user to create a resume with the help of large language 
models. The dev repo is good to start working on. We need to finish the draft of TP01 to submit this weekend. We'd like to 
have the app work with different llms potential running with in our docker compose dev deployment so that the dev process 
is easier, and so we don't run out of free trie of llm service. 

##### *Action Items*:
  - Aarthi => Update TP01
  - Zandra => Update TP01, Create 
  - Jonathan => finish implementing Auth
____ 
#### Meeting: 1/17/25 Attn(Zandra, Aarthi, Inderdeep, Jonathan)
  - Zandra => Shared design for app Presented Idea for creating a resume app
  - Aarthi => Shared ideas about adding a large language model to update model
  - Jonathan => Created GitHub Repo created docker compose environment that would build the client, and server, and db.

##### Accomplished:
Finalized project scope. We decided as a team that we would create an app that would allow users to work on building an app that would allow to:
  - Create, update and delete their account. 
  - Create, update and delete their resume.
  - Present their resume in different templates.
  - Download their resume.
##### *Action Items*:
  - Zandra, Inderdeep => Refine user stories 
  - Aarthi => Research Chat function. Find out what data we would need to send to a LLM to get the results we want. 
  - Jonathan: Work on Authentication. Email instructor topic.
____

#### Meeting: 1/10/25 Attn(Zandra, Aarthi, Inderdeep, Jonathan)

##### Accomplished:
- Discussed project requirements. The Project must be completed with a minimum of four features. Everyone is responsible for a feature both front a backbend.
- Covered we will all work off the same repo. We need to make sure they push our work regularly. You must resolve merge conflicts.
- Your code should work.
- If you are struggling, ask for help early. (This wasn't covered but is very helpful for the rest of the team.)

##### *Action Items*:
- Next Meeting everyone will propose an idea for project
- Zandra schedule recurring meeting. Will get started on design
- Jonathan, meeting minuets starter repo.
  - Front-end  => React
  - Back-end => Express
  - DB => mongoDb
  - docker container. 
