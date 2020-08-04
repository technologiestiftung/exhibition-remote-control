# Exhibition remote control

This is a very simple prototype-like software to control the power states of all devices in the [CityLAB Berlin](http://citylab-berlin.org/) exhibition. It's running on a Raspberry Pi and exposes a web interface to be controlled from the intranet.

We're using TP-Link HS100 smart power plugs to hard-switch on/off all devices. There is no clean shutdown implemented yet. The power switches are not password protected and should therefore operate inside a separate network just for the exhibition.

## User-Interface

The UI consists of one single button with instructions/warnings. After switching on the button, switching back off is disabled for a while to ensure PCs properly boot first. There is a warning to shut down projectors manually first.

![image](https://user-images.githubusercontent.com/546852/89296357-8386a580-d662-11ea-9b28-9cb36cd5a0fb.png)


## Todo:
- Properly shut down PCs (using this: [Windows PCs](https://www.howtogeek.com/109655/how-to-remotely-shut-down-or-restart-windows-pcs/), [Windows PCs](https://lifehacker.com/shut-down-your-windows-pc-remotely-from-linux-5275652), [Linux PCs](https://www.cyberciti.biz/faq/remote-shutdown-linux-computer-from-the-cli/)) and ensure PCs have shut down (using ping) before turning off smart switches.
- Turn off projectors before shutdown
