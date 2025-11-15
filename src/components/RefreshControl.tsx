import {
  RefreshControlProps,
  RefreshControl as NativeRefreshControl,
} from 'react-native';
import { useTheme } from 'react-native-paper';

export function RefreshControl(props: RefreshControlProps) {
  const theme = useTheme();

  return (
    <NativeRefreshControl
      {...props}
      enabled={props.enabled}
      refreshing={props.refreshing}
      colors={[theme.colors.onSurface]}
      progressBackgroundColor={theme.colors.elevation.level2}
      onRefresh={props.onRefresh}
    />
  );
}
