# Learning Typescript

This repo contains some material to teach a quick intro to typescript.

Be sure to check out [the official TypeScript site](https://www.typescriptlang.org/) for all the goods.

Before we go on, let's give some props where props are due: Check out [Anders Hejlsberg](https://en.wikipedia.org/wiki/Anders_Hejlsberg).

> He was the original author of **Turbo Pascal** and the chief architect of **Delphi**. He currently works for Microsoft as the lead architect of **C#** and core developer on ***TypeScript***.

## Getting Started

We're gonna work through the [Quick Start](https://www.typescriptlang.org/docs/tutorial.html) tutorial on the TypeScript page with some slight variations.

### Installing TypeScript

If you're using Visual Studio 2013 Update 2 or better, or Visual Studio Code, you should have typescript installed. If not, just npm install it.

```bash
npm install -g typescript
```

### First (Naked) TypeScript File

Now let's check out our first typescript file: [greeter.ts](01-naked/greeter.ts).

Notice that there isn't anything special going on here besides the fact that we gave the file a `.ts` extension. It's just plain old Javascript. There's the first point. Javascript is TypeScript, though I'd say it's naked TypeScript, and naked, there isn't much use in giving it a `.ts` extension, but you gotta start somewhere...

### Compiling

The thing about TypeScript is that nothing will run it directly. It needs to be *compiled*. But we don't compile it into a binary format or even an intermediate language like with .net. TypeScript compiles to *Javascript*. Let's compile `greeter.ts`.

```bash
tsc 01-naked/greeter.ts
```

Now, you should see `greeter.js` in your working folder. Congratulations! You just compiled your first Naked TypeScript application!

Why not run it?

```bash
node 01-naked/greeter
```

### Let's add some clothes (Type Annotations)

Naked TypeScript is boring. Let's tell the compiler that the person being passed to our greeter function should be a string.

**NOTE**: I jumped the gun and added the `exports` keyword to the function in this step (spoilers!) because if I didn't, then the compiler complained that I defined the function multiple times (since the naked version of greeter uses the same name as the clothed one). We haven't explored modules yet, so everything we're building is global, and without creating these new greeter files as modules, we get naming collisions. We create a module simply by exporting or importing something. Just go with it for now and we'll explore modules later.

Here's the file: [greeter.ts](02-clothed/greeter.ts). Compile and run it to verify that it works.

```bash
tsc 02-clothed/greeter.ts
node 02-clothed/greeter
```

Examine the `.js` file that the compiler spits out to see that it is still valid Javascript. However, note that there is no mention of strings anywhere in the generated Javascript.

### Now it's time to make the compiler sad

Let's break some stuff. A new version of the greeter tries to sneak in a parameter of the wrong type into the function, but TypeScript is having none of it. Check out [greeter-fail.ts](02-clothed/greeter-fail.ts).

If you have the file open in Visual Studio Code, you can see that the editor is already telling you that something is wrong. Hovering over the red squiggle will show you the full monty. The compiler will also complain.

```bash
tsc 02-clothed/greeter-fail.ts
```

Check this out, though--even though the compiler complained, it still created a Javascript file, and it kinda works.

```bash
node 02-clothed/greeter-fail
```

That's javascript for you--feed it any old type, and it'll do its best to make something of it. However, it won't always do what you expect. The beauty of TypeScript is that it gives us the warm fuzzy feeling of compile-time type checking so we get fewer surprises at runtime.

### If it looks like a duck and quacks like a duck (Interfaces!)

Now for the section that will put a smile on the face of any veteran of statically-typed object-oriented languages...let's talk about Interfaces!

TypeScript gives us interfaces, but remember we're still dealing with JavaScript here. We're talking duck-typing. Two types are compatible if their internal structures are compatible. The `implements` keyword is not required here (though it is available). You just declare an interface, and if a type implements all the interface's properties, well, then it implements the interface.

Check out [greeter.ts](03-interface/greeter.ts) for the sample code. Look at the `user` variable--it's just a raw object that happens to implement `firstName` and `lastName`--which is exactly what the interface exposes...so, that object implements the interface and TypeScript is happy. Be sure to compile and run this code to see the magic happen.

```bash
tsc 03-interface/greeter.ts
node 03-interface/greeter
```

It's also worthwhile to take a look at the generated Javascript. Note that the interface doesn't show up here--it's just a definition for the compiler to check against.

### Classes and Students and Stuff

Now that we've discovered interfaces, let's take a look at classes. If you've already explored the new class syntax of JavaScript, this part will be super familiar.

Open up [greeter.ts](04-class/greeter.ts) and poke around a bit. Notice that in the constructor we mark each parameter as public and annotate it with a type. The public tag will produce a public property with the same name as the parameter. (That's why TypeScript isn't complaining that the Student isn't implementing the Person interface!)

Compile it, run it, and examine the generated javascript. You shouldn't get any surprises.

```bash
tsc 04-class/greeter.ts
node 04-class/greeter
```

### The editor gets better with TypeScript

Take the latest class example and play around with it in Visual Studio Code. Notice that intellisense works much better with types defined. While TypeScript doesn't require you to annotate everything, the more you annotate, the more the editor will be able to help you out.

## Digging Deeper

To really dig in, you'll want to read through [The Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html). This document isn't really that big, and has pretty much everything you need to know about writing TypeScript. In this section we'll cover a few topics to get you rolling and whet your appetite.

### Type Annotations beyond string

Javascript does understand types; it just doesn't type your variables statically. TypeScript allows you to annotate your variables so that you can't accidentally impose a value of the wrong type onto a variable. The basic types that you can annotate your variables with are described perfectly well in the Handbook, so I'll just leave that link here:

[Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html). Read it; learn it; love it.

There are also some more advanced types that TypeScript exposes to you. I'll leave it as an exercise to the reader to scour the Handbook for those nuggets of wisdom.

### Modules

See [Modules in the Handbook](https://www.typescriptlang.org/docs/handbook/modules.html)

The code in the [src folder](src/index.ts) implements the same code from the classes example using modules.

### Getting Types for Third Party Modules

The code you pull down from [NPM](https://www.npmjs.com) is not TypeScript, and has no type annotations, so using other people's code doesn't give you all of the niceties that come with annotations. What should we do? *Probably just rewrite all that code ourselves using TypeScript, right?*... I think there's a better way--some folks have taken the trouble to create and organize type definitions for a huge chunk of the most popular libraries, and even some less popular ones. They can be found at [DefinitelyTyped](http://definitelytyped.org/), but more importantly, they can be included in your project by importing them from NPM by searching for "@types/{the-name-of-the-npm-package}". So, if I wanted the types for the text colorizing package called "chalk", I'd search npm for "@types/chalk". Then just install that package as a dev dependency and you get the benefits of type annotations for that package in the editor.

```bash
npm install --save chalk
npm install --save-dev @types/chalk
```

I've already done this for [src/index.ts](src/index.ts), so open it in the editor and check out the Typings magic.

### Compiling more than one file (tsconfig.json)

See [Project Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

I've set up a tsconfig.json for this project, that will compile only those files in the `src` folder, and send the compiled output to the `lib` folder. All you have to do to compile the `src` folder is:

```bash
tsc
```

TypeScript looks for the tsconfig.json file and uses the contents to decide how to proceed. Command line parameters will override the file, however.

### Linting

[TSLint](https://palantir.github.io/tslint/) is the linter of choice for TypeScript. It's very similar to ESLint, only not as mature.

I've included a sample tslint.json configuration file, as well as an npm script that runs the linter. To run it, type

```bash
npm run lint
```

Also, if you're using Visual Studio Code, be sure to install the TSLint extension.

## Don't Stop Here

Now go out and play around with TypeScript--dig into the nooks and crannies, and build something cool and useful.

For a much bigger example that uses TypeScript, check out [Text Adventure](https://github.com/dshaneg/text-adventure), an unfinished project that I converted from Javascript to TypeScript. Feel free to fork it and play around. It isn't finished, but it is functional.