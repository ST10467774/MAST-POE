import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback(props: any) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, style, ...rest } = props;

  return didError ? (
    <View style={[styles.container, style]}>
      <Image source={{ uri: ERROR_IMG_SRC }} style={styles.errorImage} {...rest} />
    </View>
  ) : (
    <Image source={{ uri: src }} style={style} {...rest} onError={handleError} />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorImage: {
    width: 50,
    height: 50,
  },
});