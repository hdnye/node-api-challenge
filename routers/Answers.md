## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your Team Lead.

- [ ] Mention two parts of Express that you learned about this week.

    Framework that sits atop nodejs web server & adds Routing, Middleware, & eloquent API

- [ ] Describe Middleware?

    An array of functions that gets the request & response. Can perform operations on them  either move onto the next middleware or return a response to the client

- [ ] Describe a Resource?

    Data accessed by the client through endpoints built to access the API through indv'l endpoints via a single URL for each endpoint that executes different code based on the http method used.

- [ ] What can the API return to help clients know if a request was successful?

    an HTTP status code correlated to succesful operation  

- [ ] How can we partition our application into sub-applications?

    By using express.Router() to add routes