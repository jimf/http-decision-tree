# HTTP Decision Tree

This is an interactive version of [choosing-code][Choosing an HTTP Status Code]
that I threw together for fun to demo some React + Ramda in my
[IntroFP][Intro to FP in JavaScript] talk. It's mostly working, but a little
rough around the edges. If given more time, I'd like to:

- add better instructions on what to do / what this is
- add labeling around the standard / useful / irrelevant color codes
- add a way to cancel / go back from a decision without having to restart
- add filtering so one can, for example, remove decisions that lead to irrelevant codes
- improve on the styles and animations
- improve on the accessibility and make sure it's fully keyboard-navigable

I had originally started down the path of implementing the decision tree using
an actual tree structure. However, I started spinning my wheels when it came
time to folding two or more trees together, and switched over to POJOs for
interest of time. I've preserved what little tree code there is, but it is
completely unused. I may come back to this at some point, however.

## Usage

To run this application:

    $ npm install
    $ npm start

And to run the tests:

    $ npm test

## License

MIT

[choosing-code]: http://racksburg.com/choosing-an-http-status-code/
[IntroFP]: https://github.com/jimf/intro-fp-js-talk
