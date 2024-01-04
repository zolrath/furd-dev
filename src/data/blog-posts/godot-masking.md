---
title: Dynamic Masking Shader in Godot
hidden: true
publishDate: 02 Dec 2023
description: How I'm dynamically masking portions of my players sprite in Godot.
tags: [godot]
---

While building Uprooted I've started drawing various "costumes" for the characters to make it easier for players to identify themselves on the screen during the action.


The complication here is that we've got a number of different veggies with different body types, and I'd like each costume to work without having to redraw each costume for each veggie.


swapping out the sprites in the animation player, but I quickly realized that I would need to do something more dynamic to support the various combinations of costumes and hair styles.
