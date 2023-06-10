#! /bin/sh

export SNAP_URL="$(snapctl get url)"
export DEVICE_ID="$(snapctl get device_id)"

if cat /proc/cpuinfo | grep -q "Pi 4"; then
  EXTRAOPTS="--disable-gpu"
fi

exec $SNAP/electron-helloworld/electron-quick-start \
	--enable-features=UseOzonePlatform \
	--ozone-platform=wayland \
	--disable-dev-shm-usage \
	--no-sandbox $EXTRAOPTS
