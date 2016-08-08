document.addEventListener('WebComponentsReady', function() {
        var template = document.getElementById('page-template');

        var batteryDevice = document.getElementById('battery-device');
        var batteryLevel = batteryDevice.querySelector('[characteristic=battery_level]');

        var heartRateDevice = document.getElementById('heart-rate-device');
        var bodySensorLocation = heartRateDevice.querySelector('[characteristic=body_sensor_location]');
        var heartRateControlPoint = heartRateDevice.querySelector('[characteristic=heart_rate_control_point]');
        var heartRateMeasurement = heartRateDevice.querySelector('[characteristic=heart_rate_measurement]');

        var getBatteryLevelButton = document.getElementById('get-battery-level');
        var getBodySensorLocationButton = document.getElementById('get-body-sensor-location');
        var resetEnergyExpendedButton = document.getElementById('reset-energy-expended');
        var startNotificationsButton = document.getElementById('start-notifications');
        var stopNotificationsButton = document.getElementById('stop-notifications');
        var disconnectButton = document.getElementById('disconnect');
        var progressBar = document.querySelector('paper-progress');

        var buttons = document.querySelectorAll('paper-button');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener('click', buttonClick);
        }

        getBatteryLevelButton.addEventListener('click', function() {
          batteryDevice.request().then(function(device) {
            return batteryLevel.read().then(function(value) {
              template.text = device.name + ' Battery Level is ' + value.getUint8(0) + '%';
              progressBar.indeterminate = false;
            })
          })
          .catch(onError);
        });

        getBodySensorLocationButton.addEventListener('click', function() {
          heartRateDevice.request().then(function(device) {
            return bodySensorLocation.read().then(function(value) {
              var loc = ['other', 'chest', 'wrist', 'finger', 'hand', 'ear lobe', 'foot'];
              template.text = device.name + ' Body sensor is placed on the ' + loc[value.getUint8(0)];
              progressBar.indeterminate = false;
            })
          })
          .catch(onError);
        });

        resetEnergyExpendedButton.addEventListener('click', function() {
          heartRateDevice.request().then(function(device) {
            // Writing 1 is the signal to reset energy expended.
            var resetEnergyExpended = new Uint8Array([1]);
            return heartRateControlPoint.write(resetEnergyExpended).then(function() {
              template.text = device.name + ' Energy expended has been reset';
              progressBar.indeterminate = false;
            })
          })
          .catch(onError);
        });

        startNotificationsButton.addEventListener('click', function() {
          heartRateDevice.request().then(function(device) {
            return heartRateMeasurement.startNotifications().then(function() {
              template.text = device.name + ' Notifications session has started.';
              progressBar.indeterminate = false;
            })
          })
          .catch(onError);
        });

        stopNotificationsButton.addEventListener('click', function() {
          heartRateDevice.request().then(function(device) {
            return heartRateMeasurement.stopNotifications().then(function() {
              template.text = device.name + ' Notifications session has stopped.';
              progressBar.indeterminate = false;
            })
          })
          .catch(onError);
        });

        disconnectButton.addEventListener('click', function() {
          heartRateDevice.disconnect();
          batteryDevice.disconnect();
          template.text = 'Bluetooth device(s) disconnected.';
          progressBar.indeterminate = false;
        });

        template.parseHeartRate = function(event) {
          var data = event.target.value;
          var flags = data.getUint8(0);
          var rate16Bits = flags & 0x1;
          var result = {};
          var index = 1;
          if (rate16Bits) {
            result.heartRate = data.getUint16(index, /*littleEndian=*/true);
            index += 2;
          } else {
            result.heartRate = data.getUint8(index);
            index += 1;
          }
          var contactDetected = flags & 0x2;
          var contactSensorPresent = flags & 0x4;
          if (contactSensorPresent) {
            result.contactDetected = !!contactDetected;
          }
          var energyPresent = flags & 0x8;
          if (energyPresent) {
            result.energyExpended = data.getUint16(index, /*littleEndian=*/true);
            index += 2;
          }
          var rrIntervalPresent = flags & 0x10;
          if (rrIntervalPresent) {
            var rrIntervals = [];
            for (; index + 1 < data.byteLength; index += 2) {
              rrIntervals.push(data.getUint16(index, /*littleEndian=*/true));
            }
            result.rrIntervals = rrIntervals;
          }
          template.text = JSON.stringify(result, null, 2);
        };

        function buttonClick() {
          progressBar.indeterminate = true;
          template.text = '';
        }

        function onError(error) {
          template.text = 'Argh! ' + error;
          progressBar.indeterminate = false;
        }
      });