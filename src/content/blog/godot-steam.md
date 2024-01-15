---
title: Integrating Steam Input Godot Steam
draft: true
publishDate: 2023-12-07
description: The basics of integrating Godot Steam into your project.
tags: [godot, steam]
---

![Illustration of Godot logo robot with steam coming out of its head](/assets/blog/godot-steam/godot-robot.png)

# Godot Steam

[Godot Steam](https://github.com/CoaguCo-Industries/GodotSteam) is a plugin for Godot that makes it easy to integrate Steamworks into your game. It's a great option if you're looking to add Steam achievements, leaderboards, Steam Input, or cloud saves to your game.

I've been using it for [Uprooted](/projects/uprooted) and it's been a fairly smooth experience, though Valves documentation for Steamworks leaves a lot to be desired and there's a bizarre lack of examples for developers out there.

We'll be integrating Steam Input with our game throughout this series, but lets start by adding Steam to Godot.

# Getting Started
Let's get started adding it to a Godot 4.2.1 project.

## Install Godot
Grab the appropriate Godot binary for your platform from the [Godot Downloads page](https://godotengine.org/download). I'm using the 64-bit Windows build for this example.

## Install Godot Steam
I'm using the GDExtension version of Godot Steam.
Install it and Project -> Project Settings -> Plugins and enable GodotSteam.

## Initialize Godot Steam
Let's create a new autoload to handle initializing Steam.

In order 
```gdscript
extends Node
const STEAM_APP_ID := 480 # Replace with your own Steam App ID

func _ready() -> void:
  var initialize_response: Dictionary = steamInitEx( true, 480 )
  print("Did Steam initialize?: %s " % initialize_response)
```


Putting it all together:
```gdscript
extends Node

const STEAM_APP_ID := 480 # Replace with your own Steam App ID

# Steam variables
var is_on_steam_deck: bool = false
var is_online: bool = false
var is_owned: bool = false
var steam_id: int = 0
var steam_username: String = ""

func _ready() -> void:
	var initialize_response: Dictionary = Steam.steamInitEx(true, STEAM_APP_ID)
	print("Did Steam initialize?: %s " % initialize_response)

	if initialize_response['status'] > 0:
		print("Failed to initialize Steam, shutting down: %s" % initialize_response)
		get_tree().quit()

	# Gather additional data
	is_on_steam_deck = Steam.isSteamRunningOnSteamDeck()
	is_online = Steam.loggedOn()
	is_owned = Steam.isSubscribed()
	steam_id = Steam.getSteamID()
	steam_username = Steam.getPersonaName()
	Steam.inputInit()
	Steam.enableDeviceCallbacks()

func _process(_delta: float) -> void:
	Steam.run_callbacks()
```

Now we can move on to the more complicated process of integrating Steam Input.
