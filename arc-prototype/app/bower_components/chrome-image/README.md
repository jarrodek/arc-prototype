# chrome-alarms
A Chrome Apps component for Alarms API.

Use the `chrome.alarms` API to schedule code to run periodically or at a specified
time in the future.

## Permissions
You need to declare "alarms" permission in your manifest file.

    ...
       "permissions": [
          "alarms"
       ],
    ...
API Docs: https://developer.chrome.com/apps/alarms

Example:

    <chrome-alarms
      id="alarms"
      on-alarm-info="onAlarmInfo"
      on-clear="onAlarmClear"
      on-alarm="onAlarm"
      name="[[name]]"></chrome-alarms>

## API
### Events
| Event | Description | Parameters |
| --- | --- | --- |
| `alarm-info` | Fired when an information about alarm(s) has been requested. The details object will always result with an array of alarms. | - `Array<Object>` alarms - see https://developer.chrome.com/apps/alarms#type-Alarm for description |
| `alarm` | Fired when an alarm has fired. | - `Object` alarm - An alarm that fired. |
| `clear` | Fired when an alarm(s) has been removed. | - `{Boolean}` wasCleared - True if the alarm was cleared. |

### Properties
| Property | Description | Type | Default |
| --- | --- | --- | --- |
| name | A name that identify the alarm. Defaults to the empty string. | String | _(empty string)_ |

### Methods
#### `create(alarmInfo)`
Creates an alarm. Near the time(s) specified by alarmInfo, the on-alarm event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.

##### alarmInfo
Describes when the alarm should fire.
See https://developer.chrome.com/apps/alarms#method-create for detailed description.

**returns** _nothing_

#### `getAlarm()`
Retrieves details about the specified alarm.
The `alarm-info` event will be fired when information is available.

**returns** _nothing_

#### `getAll()`
Request details about all alarms.
The `alarm-info` event will be fired when information is available.

**returns** _nothing_

#### `clear()`
Clears the alarm.
The `clear` event will fire when ready.

**returns** _nothing_

#### `clearAll()`
Clears all alarms.
The `clear` event will fire when ready.

**returns** _nothing_
