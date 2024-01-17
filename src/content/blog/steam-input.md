---
title: Integrating Steam Input
draft: true
publishDate: 2024-01-02
description: Integrating Steam Input with Godot's Input system.
coverImage: /src/assets/home-computer.webp
coverImageAlt: A cover image alt
category: programming
tags: [godot, steam]
---

First we'll connect to the controller connected and disconnected signals to handle when a player connects or disconnects their controller.
```gdscript
## Call this after calling `Steam.inputInit()` and `Steam.enableDeviceCallbacks()`
func init() -> void:
  Steam.input_device_connected.connect(_on_steam_input_device_connected)
  Steam.input_device_disconnected.connect(_on_steam_input_device_disconnected)
```

```gdscript
func _on_steam_input_device_connected(input_handle: int):
	if not got_handles:
		get_handles()
	Steam.activateActionSet(input_handle, current_action_set)
	print("Device connected %s" % str(input_handle))

func _on_steam_input_device_disconnected(input_handle: int):
	print("Device disconnected %s" % str(input_handle))
```

Now we should see 


Once a controller has been connected we can retrieve the handles, hopefully this is a temporary situation that will be fixed in GodotSteam soon.
```gdscript
func get_handles():
	action_set_handles[ACTION_SETS.GAME] = Steam.getActionSetHandle("GameControls")
	action_set_handles[ACTION_SETS.MENU] = Steam.getActionSetHandle("MenuControls")
	current_action_set = action_set_handles[ACTION_SETS.MENU]
	get_action_handles(action_names)
	got_handles = true
```


```gdscript
# True or false denote if it should be an analog or digial input when querying SteamInput.
var action_names = {
	"Jump": false,
	"Dash": false,
	"Interact": false,
	"Move": true,
	"Up": false,
	"Down": false,
	"Left": false,
	"Right": false,
	"Pause": false,
	# Menu
	"Start": false,
	"Back": false,
	"Select": false,
	"Deselect": false,
	"NextCostume": false,
	"PrevCostume": false,
}
var actions = {}
```

```gdscript
func get_action_handles(action_names: Dictionary):
	for action in action_names.keys():
		# If true, analog
		if action_names[action]:
			actions[action] = Steam.getAnalogActionHandle(action)
		else:
			actions[action] = Steam.getDigitalActionHandle(action)
```


# Input Wrappers
```gdscript
## This is equivalent to Input.get_action_strength except it will only check the relevant device.
func get_action_strength(device: int, action: StringName, exact_match: bool = false) -> float:
	if device >= 0:
		if not got_handles: return 0
		var action_data = Steam.getAnalogActionData(device, actions[action])
		return action_data.x
	return Input.get_action_strength(action, exact_match)
```

```gdscript
## This is equivalent to Input.get_axis except it will only check the relevant device.
func get_axis(device: int, negative_action: StringName, positive_action: StringName) -> float:
	if device >= 0:
		if not got_handles: return 0
		# getAnalogActionData returns only the x axis for single axis inputs such as triggers.
		var negative = Steam.getAnalogActionData(device, actions[negative_action])
		var positive = Steam.getAnalogActionData(device, actions[positive_action])
		return positive.x - negative.x
	return Input.get_axis(negative_action, positive_action)
```

```gdscript
## This is equivalent to Input.get_vector except it will only check the relevant device.
func get_vector(device: int, negative_x: StringName, positive_x: StringName, negative_y: StringName, positive_y: StringName, deadzone: float = -1.0) -> Vector2:
	if device >= 0:
		if not got_handles: return Vector2.ZERO
		var negative_x_val = Steam.getAnalogActionData(device, actions[negative_x])
		var positive_x_val = Steam.getAnalogActionData(device, actions[positive_x])
		var negative_y_val = Steam.getAnalogActionData(device, actions[negative_y])
		var positive_y_val = Steam.getAnalogActionData(device, actions[positive_y])
		return Vector2(positive_x_val - negative_x_val, -(positive_y_val - negative_y_val)).normalized()
	return Input.get_vector(negative_x, positive_x, negative_y, positive_y, deadzone)
```

```gdscript
```

```gdscript
```
