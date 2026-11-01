# Prompt Log

> I've been given the attached assignment as a interview tech assessment. I'd like your help in completing it.
>
> In addition to the details in the PDF, these are other considerations after my first pass:
> - Use typescript/nodejs as the backend
> - Use react on the frontend
>
> Given that information, can you:
> - Recommend a project structure
> - Provide a high-level overview/explanation of each aspect of the project
>
> I'd like to review the plan before getting started.
> 
> (PDF attached)


My goal here was simply to get a high-level view of what this API project would look like. Focusing specifically 
on the project structure and purposes of each component.

---
> Does yahoo finance provide official documentation on their API I can read?

I was given sources on how Yahoo's finance API worked, but I wanted to make sure I was getting official documentation.

---
> Okay, thank you. I concur with the project structure. Can you start by creating just the backend? I'd like to be able 
> to test the API functions correctly with Bruno before moving to the frontend.

Start with just the backend, since it'll be easy to test the output and make changes by verifying with direct HTTP 
calls.

---
> My background is in PHP and ko.js from working in Adobe Commerce. Can you explain (at a high level) the purposes of 
> stock.ts, yahooFinanceClient.ts, and dailyAggregator.ts? Specifically the responsibilities of those files and a breakdown of their various sections.

Since I'm not as familiar with nodejs apps, I wanted to make sure I had an understanding of the details of the 
implementation. That way I'd be able to more effectively debug if necessary.

---
> The API looks to be functioning correctly from my testing in Bruno. Can you go ahead and create the frontend? Please 
> provide the same high-level overview and breakdown as with the backend.

My testing in Bruno worked for all cases, both "happy" and "unhappy". I was ready to move to the frontend.

The CSS provided... left much to be desired. I made significant changes to the styles to make the application a bit 
easier on the eyes.