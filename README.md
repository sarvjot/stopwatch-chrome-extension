# stopwatch-chrome-extension

I tried to make a stopwatch extension for chrome as I constantly felt the need of having a google stopwatch in another tab while solving problems. However chrome extensions manifest version 2 will get outdated next year and manifest version 3 [doesn't](https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension) seem to provide support for a persistent background script, which would have maintained the time stamp.

For now I went ahead with manifest 3, this extension would work in background for atmost one minute. Credits for icon : [Freepik](https://www.flaticon.com/free-icons/time-management)