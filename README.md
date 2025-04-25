# Building a multi-monitor web app using declarative APIs

## Introduction

Making use of multiple monitors within the context of one piece of software is something more commonly seen in desktop applications,
however, some users will find it useful in some web applications as well. If there is lots of options or data that are tightly coupled to each other,
it can make sense to have it displayed all in one web page, thus increseaing the likelihood of having an overcrowded UI, which is usually addressed by 
hiding some of it behind a section that is in some way collapsible. This might not be the most convenient for the user, since they are still going to have
an overcrowded screen when they choose to display multiple sections at the same time, which is where being able to detach some part of the application
to a different window that can be moved to a secondary monitor could prove useful for the user's productivity and the overall user experience.

To illustrate a use-case for this, I created a web app using react and webpack which allows processing requests for some users that are initially placed in a queue.
The queue of users as well as a history of the processed requests are placed in their own sections in a side-panel, which can be detached to a secondary window, allowing more space
for the main window, which is where the list of the on-going requests and the editor to respond to these is displayed. This is how it looks like:

## Technical overview

There could various ways to achieving this, one that is going to be suitable for the more common use-cases is to have a different HTML used in the secondary window that is going to load a javascript chunk specific for the functionalities needed in that window.
This is the option we are going to explore in the following sections of this article, with the data of the 
two windows being kept in sync using the [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API), which has its own limitations 
that have to be worked around of. We will also look at creating a re-usable react component to hide the implementation details of using [Window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)
to trigger the secondary window.

## Setting up the bundle

The most notable aspects of the bundler's configuration is setting up the entrypoint for the secondary window, which in webpack this is rather straightforward to do, as shown below: 
![image](https://github.com/user-attachments/assets/2135e16c-4b26-4b68-a683-441d96172dd3)
Basically, in the "entry" object another key-value pair is added to have the secondary window chunk generated. This new entrypoint needs to act as a standalone react application as it's going to be loaded in a entirely isolated context.
Then, using the HtmlWebpackPlugin the react app can be injected in a new html page using the desired html template. Finally, to avoid hard-coding the path to the secondary window html page in the code, the value can be exposed as a global variable like so:
![image](https://github.com/user-attachments/assets/71b49598-4b9f-4559-ba63-2494b5d824b5)

