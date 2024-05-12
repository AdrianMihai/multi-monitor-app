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

There could various ways to achieving this, one that is going to be suitable for the more common use-cases is to have a different HTML page loading a new entrypoint
from the main javascript app in the secondary window. This is the option we are going to explore in the following sections of this article, with the data of the 
two windows being kept in sync using the [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API), which has its own limitations 
that have to be worked around of. We will also look at creating a re-usable react component to hide the implementation details of using [Window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)
to trigger the secondary window.
