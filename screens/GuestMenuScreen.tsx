// screens/GuestMenuScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MenuItem } from '../types';
import { COURSES } from '../constants';

interface GuestMenuScreenProps {
  menuItems: MenuItem[];
  onBack: () => void;
}

const GuestMenuScreen: React.FC<GuestMenuScreenProps> = ({ menuItems, onBack }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  const getFilteredItems = () => {
    if (selectedCourse === 'all') {
      return menuItems;
    }
    return menuItems.filter((item: MenuItem) => item.course === selectedCourse);
  };

  const filteredItems = getFilteredItems();
  const selectedCourseInfo = selectedCourse === 'all' 
    ? null 
    : COURSES.find((c) => c.id === selectedCourse);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedCourse === 'all' && styles.filterChipActive,
            ]}
            onPress={() => setSelectedCourse('all')}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedCourse === 'all' && styles.filterChipTextActive,
              ]}
            >
              All Items
            </Text>
          </TouchableOpacity>
          {COURSES.map((course) => {
            const itemCount = menuItems.filter((item: MenuItem) => item.course === course.id).length;
            return (
              <TouchableOpacity
                key={course.id}
                style={[
                  styles.filterChip,
                  selectedCourse === course.id && styles.filterChipActive,
                ]}
                onPress={() => setSelectedCourse(course.id)}
              >
                <Text style={styles.filterChipIcon}>{course.icon}</Text>
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCourse === course.id && styles.filterChipTextActive,
                  ]}
                >
                  {course.name} ({itemCount})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.menuItemsList}>
        {selectedCourseInfo && (
          <View style={styles.courseHeader}>
            <Text style={styles.courseHeaderIcon}>{selectedCourseInfo.icon}</Text>
            <Text style={styles.courseHeaderText}>{selectedCourseInfo.name}</Text>
          </View>
        )}

        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {selectedCourse === 'all'
                ? 'No menu items available yet'
                : `No items in ${selectedCourseInfo?.name} yet`}
            </Text>
          </View>
        ) : (
          filteredItems.map((item: MenuItem) => {
            const courseInfo = COURSES.find((c) => c.id === item.course);
            return (
              <View key={item.id} style={styles.menuItem}>
                <View style={styles.menuItemHeader}>
                  <View style={styles.menuItemTitleContainer}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    {courseInfo && (
                      <View style={styles.courseBadge}>
                        <Text style={styles.courseBadgeIcon}>{courseInfo.icon}</Text>
                        <Text style={styles.courseBadgeText}>{courseInfo.name}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceTagText}>R{item.price.toFixed(2)}</Text>
                  </View>
                </View>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
              </View>
            );
          })
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
  filterContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a1a',
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#E8A87C',
  },
  filterChipIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  filterChipText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  filterChipTextActive: {
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
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  menuItemTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  courseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  courseBadgeIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  courseBadgeText: {
    fontSize: 10,
    color: '#E8A87C',
    fontWeight: 'bold',
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

export default GuestMenuScreen;

