// App.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MenuItem } from './types';
import { COURSES } from './constants';
import AppetizersScreen from './screens/AppetizersScreen';
import MainsScreen from './screens/MainsScreen';
import DessertsScreen from './screens/DessertsScreen';
import BeveragesScreen from './screens/BeveragesScreen';
import SpecialsScreen from './screens/SpecialsScreen';
import ManageMenuScreen from './screens/ManageMenuScreen';
import GuestMenuScreen from './screens/GuestMenuScreen';

const App = () => {
  const [screen, setScreen] = useState<
    | 'home'
    | 'main'
    | 'appetizers'
    | 'mains'
    | 'desserts'
    | 'beverages'
    | 'specials'
    | 'manage'
    | 'guest'
  >('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const handleAddItem = (item: MenuItem) => {
    setMenuItems([...menuItems, item]);
  };

  const handleRemoveItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const getItemsByCourse = (courseName: string) => {
    return menuItems.filter((item: MenuItem) => item.course === courseName);
  };

  const getTotalItems = () => menuItems.length;

  const getAveragePriceByCourse = (courseId: string) => {
    const items = getItemsByCourse(courseId);
    if (items.length === 0) return '0.00';
    const total = items.reduce((sum: number, item: MenuItem) => sum + item.price, 0);
    return (total / items.length).toFixed(2);
  };

  const getOverallAveragePrice = () => {
    if (menuItems.length === 0) return '0.00';
    const total = menuItems.reduce((sum: number, item: MenuItem) => sum + item.price, 0);
    return (total / menuItems.length).toFixed(2);
  };

  // Home Screen - Shows complete menu with average prices by course
  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.homeScreen}>
          <View style={styles.homeHeader}>
            <Text style={styles.homeIcon}>👨‍🍳</Text>
            <Text style={styles.homeTitle}>Welcome Cristoffel!</Text>
            <Text style={styles.homeSubtitle}>Private Culinary Experiences</Text>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Total Items:</Text>
              <Text style={styles.statsValue}>{getTotalItems()}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Overall Avg Price:</Text>
              <Text style={styles.statsValue}>R{getOverallAveragePrice()}</Text>
            </View>
          </View>

          <View style={styles.averagePricesSection}>
            <Text style={styles.sectionTitle}>Average Prices by Course</Text>
            {COURSES.map((course) => {
              const avgPrice = getAveragePriceByCourse(course.id);
              const itemCount = getItemsByCourse(course.id).length;
              return (
                <View key={course.id} style={styles.coursePriceCard}>
                  <View style={styles.coursePriceHeader}>
                    <Text style={styles.coursePriceIcon}>{course.icon}</Text>
                    <Text style={styles.coursePriceName}>{course.name}</Text>
                  </View>
                  <View style={styles.coursePriceInfo}>
                    <Text style={styles.coursePriceLabel}>Avg Price:</Text>
                    <Text style={styles.coursePriceValue}>R{avgPrice}</Text>
                    <Text style={styles.coursePriceCount}>({itemCount} items)</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.completeMenuSection}>
            <Text style={styles.sectionTitle}>Complete Menu</Text>
            {menuItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No menu items yet. Manage your menu to add items.
                </Text>
              </View>
            ) : (
              COURSES.map((course) => {
                const items = getItemsByCourse(course.id);
                if (items.length === 0) return null;

                return (
                  <View key={course.id} style={styles.menuCourseSection}>
                    <View style={styles.menuCourseHeader}>
                      <Text style={styles.menuCourseIcon}>{course.icon}</Text>
                      <Text style={styles.menuCourseTitle}>{course.name}</Text>
                    </View>
                    {items.map((item: MenuItem) => (
                      <View key={item.id} style={styles.menuItemCard}>
                        <View style={styles.menuItemHeader}>
                          <Text style={styles.menuItemName}>{item.name}</Text>
                          <View style={styles.priceTag}>
                            <Text style={styles.priceTagText}>R{item.price.toFixed(2)}</Text>
                          </View>
                        </View>
                        <Text style={styles.menuItemDescription}>{item.description}</Text>
                      </View>
                    ))}
                  </View>
                );
              })
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setScreen('manage')}
            >
              <Text style={styles.actionButtonText}>Manage Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.guestButton]}
              onPress={() => setScreen('guest')}
            >
              <Text style={styles.actionButtonText}>Guest View</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main Screen (Menu Overview)
  if (screen === 'main') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.mainScreen}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setScreen('home')}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chef Cristoffel</Text>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Total Items :</Text>
            <Text style={styles.statsValue}>{getTotalItems()}</Text>
            <Text style={styles.statsLabel}>Avg Price :</Text>
            <Text style={styles.statsValue}>R{getOverallAveragePrice()}</Text>
          </View>

          <ScrollView style={styles.courseList}>
            {COURSES.map((courseItem) => {
              const items = getItemsByCourse(courseItem.id);
              return (
                <TouchableOpacity
                  key={courseItem.id}
                  style={styles.courseItem}
                  onPress={() => {
                    setScreen(courseItem.id as 'appetizers' | 'mains' | 'desserts' | 'beverages' | 'specials');
                  }}
                >
                  <Text style={styles.courseIcon}>{courseItem.icon}</Text>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{courseItem.name}</Text>
                    <Text style={styles.courseCount}>{items.length} items</Text>
                  </View>
                  <View style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.addDishButton}
            onPress={() => setScreen('manage')}
          >
            <Text style={styles.addDishButtonText}>Manage Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Manage Menu Screen
  if (screen === 'manage') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ManageMenuScreen
          menuItems={menuItems}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onBack={() => setScreen('home')}
        />
      </SafeAreaView>
    );
  }

  // Guest Menu Screen
  if (screen === 'guest') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <GuestMenuScreen menuItems={menuItems} onBack={() => setScreen('home')} />
      </SafeAreaView>
    );
  }

  // Course-specific screens
  if (screen === 'appetizers') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AppetizersScreen menuItems={menuItems} onBack={() => setScreen('main')} />
      </SafeAreaView>
    );
  }

  if (screen === 'mains') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MainsScreen menuItems={menuItems} onBack={() => setScreen('main')} />
      </SafeAreaView>
    );
  }

  if (screen === 'desserts') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <DessertsScreen menuItems={menuItems} onBack={() => setScreen('main')} />
      </SafeAreaView>
    );
  }

  if (screen === 'beverages') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <BeveragesScreen menuItems={menuItems} onBack={() => setScreen('main')} />
      </SafeAreaView>
    );
  }

  if (screen === 'specials') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SpecialsScreen menuItems={menuItems} onBack={() => setScreen('main')} />
      </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  homeScreen: {
    flex: 1,
    padding: 20,
  },
  homeHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  homeIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  homeSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  statsCard: {
    backgroundColor: '#E8A87C',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statsLabel: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  averagePricesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  coursePriceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  coursePriceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  coursePriceIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  coursePriceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  coursePriceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 34,
  },
  coursePriceLabel: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
  },
  coursePriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E8A87C',
    marginRight: 8,
  },
  coursePriceCount: {
    fontSize: 12,
    color: '#999',
  },
  completeMenuSection: {
    marginBottom: 20,
  },
  menuCourseSection: {
    marginBottom: 20,
  },
  menuCourseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8A87C',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  menuCourseIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  menuCourseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  menuItemCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
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
    textAlign: 'center',
  },
  actionButtons: {
    marginTop: 10,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#E8A87C',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginBottom: 10,
  },
  guestButton: {
    backgroundColor: '#4a90e2',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  mainScreen: {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  backButton: {
    fontSize: 28,
    color: '#1a1a1a',
    marginRight: 10,
  },
  courseList: {
    flex: 1,
    padding: 20,
  },
  courseItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  courseCount: {
    fontSize: 12,
    color: '#999',
  },
  viewButton: {
    backgroundColor: '#E8A87C',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  viewButtonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  addDishButton: {
    backgroundColor: '#E8A87C',
    margin: 20,
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
  },
  addDishButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});

export default App;
