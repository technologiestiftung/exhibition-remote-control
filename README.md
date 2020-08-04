# Exhibition remote control

This is a very simple prototype-like software to control the power states of all devices in the [CityLAB Berlin](http://citylab-berlin.org/) exhibition. It's running on a Raspberry Pi and exposes a web interface to be controlled from the intranet.

We're using TP-Link HS100 smart power plugs to hard-switch on/off all devices. There is no clean shutdown implemented yet. The power switches are not password protected and should therefore operate inside a separate network just for the exhibition.

[List of supported TP-Link devices](https://github.com/plasticrake/tplink-smarthome-api)

## User-Interface

The UI consists of one single switch with instructions/warnings. After turning on the switch, switching back off is disabled for a while to ensure PCs properly boot first. There is a warning to shut down projectors manually first.

All plugs are switched staggeredly (1 per second) to allow the local power grid to adjust for the load difference.

![image](https://user-images.githubusercontent.com/546852/89304466-bedaa180-d66d-11ea-8ebb-d10a3527b57e.png)

## Configuration

Copy `.env-sample` to `.env` and change the credentials. Use `config.json` to change the IPs of your plugs.

Be aware: TP-Link plugs don't allow set static IP addresses. Make sure to fix IPs for those devices in your router config using their MAC addresses.

## Todo:
- Properly shut down PCs (using this: [Windows PCs](https://www.howtogeek.com/109655/how-to-remotely-shut-down-or-restart-windows-pcs/), [Windows PCs](https://lifehacker.com/shut-down-your-windows-pc-remotely-from-linux-5275652), [Linux PCs](https://www.cyberciti.biz/faq/remote-shutdown-linux-computer-from-the-cli/)) and ensure PCs have shut down (using ping) before turning off smart switches.
- Turn off projectors before shutdown
- Poll smart plug state
