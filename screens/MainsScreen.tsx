// screens/MainsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MenuItem } from '../types';
import { COURSES } from '../constants';

interface MainsScreenProps {
  menuItems: MenuItem[];
  onBack: () => void;
}

const MainsScreen: React.FC<MainsScreenProps> = ({ menuItems, onBack }) => {
  const mains = menuItems.filter((item: MenuItem) => item.course === 'mains');
  const courseInfo = COURSES.find((c) => c.id === 'mains');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{courseInfo?.name}</Text>
      </View>

      <ScrollView style={styles.menuItemsList}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseHeaderIcon}>{courseInfo?.icon}</Text>
          <Text style={styles.courseHeaderText}>{courseInfo?.name}</Text>
        </View>

        {mains.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No items in {courseInfo?.name} yet
            </Text>
          </View>
        ) : (
          mains.map((item: MenuItem) => (
            <View key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemHeader}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <View style={styles.priceTag}>
                  <Text style={styles.priceTagText}>R{item.price.toFixed(2)}</Text>
                </View>
              </View>
              <Text style={styles.menuItemDescription}>
                {item.description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8A87C',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    fontSize: 28,
    color: '#1a1a1a',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  menuItemsList: {
    flex: 1,
    padding: 20,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8A87C',
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
  },
  courseHeaderIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  courseHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  menuItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  priceTag: {
    backgroundColor: '#E8A87C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceTagText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 12,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#999',
    lineHeight: 18,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MainsScreen;

