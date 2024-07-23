# bankins-startup-be

You work for an online banking startup. The product you are working on needs a way to let users add and withdraw money from an account. You are asked to provide two endpoints, one to read the balance of an account, and one to withdraw or add money. Assume that if a user or account does not exist, you can create both on the fly when adding or withdrawing money.
You’re responsible to design a solution and to actually code it in Python or Node.js (just use the language you’re more comfortable with). You must version this project with git and provide a public URL where we can check your solution. Please don’t put any reference to our company inside the repository.

Some constraints:
* provide a README.md file with clear instructions about how we can test your service in a local development environment;
* the communication protocol will be HTTP. You’re free to design as you like, but you’re asked to provide documentation for both of the endpoints;
* this service is meant to operate inside a micro-services architecture and must be shipped inside a docker image;

Some suggestions:
* automated unit tests for the project are a plus;
* using an external database for persistency is a plus, but even an in memory solution is ok;