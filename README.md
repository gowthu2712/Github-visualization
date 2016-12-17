# Github-visualization
Visualization for Github repositories

# Introduction
GitHub, the web-based Git repository hosting service, provides versioning control and source code management. With the management of source code and storage of different versions of a file, there are voluminous data available from GitHub waiting to be explored and to get insights from. Our project aims at visualizing this rich source of data from GitHub so that useful insights can be achieved. The visualizations are adaptive based on the audience and the viewers have complete control over what they want to drill down to. This aspect of dynamic user configurable visualization helps this project stand apart from the traditional visualization approaches. In this project work, we explore visualizations to answer questions related to Github users and repositories.

# Interesting Questions:
• Provide suggestions for repositories for new Github users so that they can collaborate and contribute to the projects
• Provide a representation to compare and contrast the contributions made by different users to a repository

# Comparison of contributions by users to a repository
Github provides a graphical representation to present an overview of contributions/commits made to a particular repository and also a detailed graph on the changes made by each user to that repository.

While this is helpful in understanding how active/inactive a particular repository is over a period of time and the activity of a user in the repository, it doesn’t provide insights in the following scenarios:

1. Several companies require to include the Github profile of applicants in their hiring applica- tion. This is to get a sense of the contributions made by an individual to the repositories. While Github lists the contributions of a specific user, it doesn’t help when the hiring committee wants to compare the contributions of an applicant against the other contributors of the project.
2. Companies, especially developer teams, often tend to use the contributions made by indi- viduals on a particular project as a measure of their performance assessment. While Github offers a view on the contributions made to the repository for each user, there is no way to compare and contrast the contributions made by different developers over a period of time. A performance assessment committee would also want a visualization to compare the contributions made by different employees to a particular Github repository.

To address both the scenarios listed above, we present a visualization in Figure 6 using Event- Drops.js [Pet14] to compare and contrast the contributions made by users to a repository. Event- Drops is a zoomable time-series map originally created by Jonathan Petitcolas, and made using the D3 library, and made available open-source on GitHub (Petitcolas, 2014).

We use this EventDrops visualization and the concept of data ink maximization to compare and contrast the different contributors of the project based on their contributions to a repository. From the default zoomed-out view, one can see the number of commits (contributions) made to a repository by each user. The more darker the circles signify the more number of commits to the project by the user. On zooming in, one can view the commit information at much more granular level.

# Repository Suggestions
Apart from offering the Git services of versioning control and source code management, Github also allows users to collaborate and contribute to existing projects. However, this might be over- whelming for users as finding the desired repositories to work on is not easy. To overcome this, we present a visualization to suggest repositories to work on based on:
• user’s language preferences 
• parameters like :
1. Repository with maximum number of contributors so that a user can collaborate with other contributors of the project
2. Repositories with scope for improvement in terms of the number of issues so that a user can work on resolving the issues pertaining to the repository,
3. The most followed projects by the Github community so that user can follow or contribute to such repositories.

We provide a dynamic bubble chart and tabular representation displaying the top 10 repository suggestions based on the language and other parameter preferences. The inputs are the programming language preference and one of the above mentioned parameters to filter the desired repositories to work on. The size of the bubble is an indicator of the size of the unit of the parameter.

This visualization helps to identify repositories to work on based on the expertise on a pro- gramming language and preferences like most contributors to the project, project with most issues, large scale project based on the length of code.
