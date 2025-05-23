import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { theme, globalStyles } from '../styles/theme';

const InfoCard = ({
  title,
  content,
  icon,
  onPress,
  onMorePress,
  showMoreButton = false,
  style,
}) => {
  return (
    <Card style={[globalStyles.card, style]} onPress={onPress}>
      <Card.Content>
        <View style={styles.headerContainer}>
          {icon && (
            <View style={styles.iconContainer}>
              <IconButton icon={icon} size={24} iconColor={theme.colors.primary} />
            </View>
          )}
          <View style={styles.titleContainer}>
            <Title style={styles.title}>{title}</Title>
          </View>
          {showMoreButton && (
            <IconButton
              icon="dots-vertical"
              size={20}
              onPress={onMorePress}
              iconColor={theme.colors.text}
            />
          )}
        </View>
        {typeof content === 'string' ? (
          <Paragraph style={styles.content}>{content}</Paragraph>
        ) : (
          content
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  iconContainer: {
    marginRight: theme.spacing.s,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 18,
  },
  content: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default InfoCard; 