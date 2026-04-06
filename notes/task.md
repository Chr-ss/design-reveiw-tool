## The case

Teams often need to review and compare different design options before deciding what to explore further. In practice, this usually means working with information from different places, understanding trade-offs quickly, and presenting the options in a way that supports discussion.

Your assignment is to build a small product prototype that helps a user review, add, and compare design options.

## Your task

Build a small application where a user can:

- browse a set of design options
- open an option to review its details
- compare multiple options side by side, or in another clear format
- add new options manually
- import options from a publicly accessible endpoint
- persist the data in a practical way so the app works locally

The goal is not to build a perfect or finished product. We want to see how you think about the problem, what you prioritize, and how you explain the choices you make.

## Suggested context

You can imagine that each option represents an early-stage design proposal for the same project.

Each option could include information such as:

- name
- short description
- area
- estimated embodied carbon
- daylight score
- cost estimate
- program fit
- tags or notes

You do not need to use all of these. You can define the final data model yourself, as long as it helps support comparison in a useful way. You are free to get as creative as you want with the data model.

## What the product should include

Please include the following:

### 1. Option list

A main view where users can browse the available design options.

Each option should show enough information to make scanning easy.

### 2. Option detail

Users should be able to open an option and understand it in more depth.

### 3. Comparison flow

Users should be able to compare at least two options in a clear way.

This can be side by side, in a table, through charts, or another format that makes sense.

### 4. Manual creation

Users should be able to add a new option through the interface.

### 5. Import from a public endpoint

Please include a way to add options from a publicly accessible endpoint.

This does not need to be complex. What matters is that we can see how you handle external data and map it into your own model.

It is fine if:

- you choose the endpoint yourself
- you only import part of the available data
- you transform the incoming data into your own structure

Please document your assumptions.

### 6. Basic states

Please handle:

- loading states
- empty states
- error states

These do not need to be elaborate, but we do want to see that you think about the full experience.

### 7. Reusable UI thinking

This does not need to become a full design system, but we would like to see some structure in the UI. You are encouraged to not spend too much time on this, so we encourage the use of ShadCN components or any components library you prefer.

For example:

- buttons
- inputs
- cards
- tables
- tags
- comparison patterns
- feedback states

## Technical notes

We recommend using the **T3 stack** if it helps you move quickly, but this is **not required**.

For persistence, a **Supabase** database is a good option if you want a simple free setup, but a **local JSON file** or another lightweight approach is also completely fine.

We also have a repository we can share if you would like a starting point. You are welcome to use it, but it may come with opinions you may not want, so this is entirely up to you.

This assignment **does not need to be deployed**. As long as it works locally and is easy to run, that is enough.

## What we would like you to submit

Please send us:

1. **A link to the code**
   - GitHub is fine

2. **A short README**
   Please include:
   - how to run the project locally
   - the stack you chose and why
   - how you approached the data model
   - key decisions you made
   - trade-offs or shortcuts
   - what you would improve if you had more time

3. **A short explanation of your thinking**
   This can be inside the README or as a separate note.

   We are especially interested in:
   - how you understood the problem
   - what you chose to prioritize
   - how you balanced product thinking, code quality, and time
   - how you handled importing and mapping external data

## Time expectation

Please try to keep this to around **4 to 6 hours**. It's up to you and we will not penalize you for taking longer or shorter.

You do not need to make it perfect. We would rather see a clear and thoughtful solution than something overbuilt.

If you need to make assumptions, that is completely fine. Just tell us what they were.

## What we care about most

We will mainly be looking at:

- how you break down the problem
- how you communicate your thinking
- how you structure your code
- how you make trade-offs
- how you connect technical decisions to user needs
- how you think about reuse and UI consistency
- how you handle data coming from outside your system

**Bonus points if your submission also shows some UI skill and part of your process.** This could be through interface decisions, interaction ideas, visual clarity, sketches, notes, iterations, or a short explanation of how your thinking evolved.

Architectural System Diagrams (of your app, not the buildings ) are also welcome.

This is not required, but it helps us understand how you work.

## What happens next

After you send the assignment, we will schedule the live interview.

In that conversation, we will:

- review your solution together
- ask about your decisions and trade-offs
- talk more about your technical background
- discuss design systems
- use the assignment as a starting point to understand how you work
- meet the rest of the team and get to know you better

The goal of the interview is not just to review the output. It is to have a real technical conversation around your approach.

Please let us know if anything is unclear, or if there is something we can do to help you show your best work.

