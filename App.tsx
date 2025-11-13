// App.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Types
interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

interface Course {
  id: string;
  name: string;
  icon: string;
}

const COURSES: Course[] = [
  { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
  { id: 'mains', name: 'Mains', icon: '🍖' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'beverages', name: 'Beverages', icon: '🍷' },
  { id: 'specials', name: 'Specials', icon: '💎' },
];

const App = () => {
  const [screen, setScreen] = useState<'home' | 'main' | 'menu' | 'add'>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Truffle Risotto',
      description: 'Creamy Arborio rice with black truffle shavings, aged parmesan, and white wine reduction',
      course: 'mains',
      price: 285.00
    },
    {
      id: '2',
      name: 'Chocolate Soufflé',
      description: 'Dark chocolate soufflé with vanilla bean ice cream and raspberry coulis',
      course: 'desserts',
      price: 95.00
    },
    {
      id: '3',
      name: 'Seared Scallops',
      description: 'Pan-seared scallops with cauliflower puree and crispy pancetta',
      course: 'appetizers',
      price: 165.00
    },
    {
      id: '4',
      name: 'Champagne Cocktail',
      description: 'Dom Pérignon with elderflower liqueur and fresh berries',
      course: 'beverages',
      price: 220.00
    },
    {
      id: '5',
      name: 'Burrata Caprese',
      description: 'Fresh burrata with heirloom tomatoes, basil oil, and aged balsamic',
      course: 'appetizers',
      price: 145.00
    },
    {
      id: '6',
      name: 'Wagyu Beef Tenderloin',
      description: 'Premium Wagyu with roasted veg and red wine reduction',
      course: 'specials',
      price: 485.00
    }
  ]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  
  // Form state
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const handleAddDish = () => {
    if (dishName && description && course && price) {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: dishName,
        description: description,
        course: course,
        price: parseFloat(price),
      };
      setMenuItems([...menuItems, newItem]);
      
      // Reset form
      setDishName('');
      setDescription('');
      setCourse('');
      setPrice('');
      setScreen('main');
    }
  };

  const getItemsBySelectedCourse = () => {
    if (!selectedCourse) return [];
    return menuItems.filter((item: MenuItem) => item.course === selectedCourse);
  };

  const getItemsByCourse = (courseName: string) => {
    return menuItems.filter((item: MenuItem) => item.course === courseName);
  };

  const getTotalItems = () => menuItems.length;

  const getAveragePrice = () => {
    if (menuItems.length === 0) return 0;
    const total = menuItems.reduce((sum: number, item: MenuItem) => sum + item.price, 0);
    return (total / menuItems.length).toFixed(2);
  };

  // Home Screen
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

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🔧</Text>
            <Text style={styles.featureTitle}>Craft Every Detail</Text>
            <Text style={styles.featureText}>
              Appetizers to desserts, bring your vision to life - the story of your culinary vision
            </Text>
            <View style={styles.menuStatsHome}>
              <Text style={styles.menuStatsLabel}>Menu Items:</Text>
              <Text style={styles.menuStatsValue}>{getTotalItems()}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.featureButton}>
            <Text style={styles.featureButtonIcon}>+</Text>
            <View>
              <Text style={styles.featureButtonTitle}>Add Dishes</Text>
              <Text style={styles.featureButtonText}>
                Create detailed menu items with descriptions and pricing
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton}>
            <Text style={styles.featureButtonIcon}>📂</Text>
            <View style={styles.featureButtonTextContainer}>
              <Text style={styles.featureButtonTitle}>Organize By Course</Text>
              <Text style={styles.featureButtonText}>
                Sort dishes into appetizers, mains, desserts{'\n'}and more
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton}>
            <Text style={styles.featureButtonIcon}>✏️</Text>
            <View style={styles.featureButtonTextContainer}>
              <Text style={styles.featureButtonTitle}>Easy Management</Text>
              <Text style={styles.featureButtonText}>
                Update and modify your menu items effortlessly
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setScreen('main')}
          >
            <Text style={styles.startButtonText}>View Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.startButton, styles.createDishButton]}
            onPress={() => setScreen('add')}
          >
            <Text style={styles.startButtonText}>Create New Dish</Text>
          </TouchableOpacity>
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
            <Text style={styles.headerIcon}>👨‍🍳</Text>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Chef Cristoffel</Text>
            </View>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Total Items :</Text>
            <Text style={styles.statsValue}>{getTotalItems()}</Text>
            <Text style={styles.statsLabel}>Avg Price :</Text>
            <Text style={styles.statsValue}>R{getAveragePrice()}</Text>
          </View>

          <ScrollView style={styles.courseList}>
            {COURSES.map((course) => {
              const items = getItemsByCourse(course.id);
              return (
                <TouchableOpacity
                  key={course.id}
                  style={styles.courseItem}
                  onPress={() => {
                    setSelectedCourse(course.id);
                    setScreen('menu');
                  }}
                >
                  <Text style={styles.courseIcon}>{course.icon}</Text>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{course.name}</Text>
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
            onPress={() => setScreen('add')}
          >
            <Text style={styles.addDishButtonText}>Add Dish</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Menu Items Screen (by course)
  if (screen === 'menu') {
    const courseItems = getItemsBySelectedCourse();
    const courseName = COURSES.find((c: Course) => c.id === selectedCourse)?.name || '';

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.mainScreen}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setScreen('main')}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>All Menu Items</Text>
          </View>

          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Search Dishes...</Text>
          </View>

          <View style={styles.categoryTabs}>
            {COURSES.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={[
                  styles.categoryTab,
                  selectedCourse === course.id && styles.categoryTabActive,
                ]}
                onPress={() => setSelectedCourse(course.id)}
              >
                <Text style={[
                  styles.categoryTabText,
                  selectedCourse === course.id && styles.categoryTabTextActive,
                ]}>{course.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.menuItemsList}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseHeaderIcon}>
                {COURSES.find((c: Course) => c.id === selectedCourse)?.icon}
              </Text>
              <Text style={styles.courseHeaderText}>{courseName}</Text>
            </View>

            {courseItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No items in {courseName} yet
                </Text>
              </View>
            ) : (
              courseItems.map((item: MenuItem) => (
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
      </SafeAreaView>
    );
  }

  // Add New Dish Screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainScreen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('main')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Dish</Text>
          <TouchableOpacity onPress={handleAddDish}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.formContainer}>
          <TouchableOpacity style={styles.createNewButton}>
            <Text style={styles.createNewIcon}>+</Text>
            <View>
              <Text style={styles.createNewTitle}>Create New Dish</Text>
              <Text style={styles.createNewText}>
                Add a new creation to the menu
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.label}>Dish Name :</Text>
          <Text style={styles.helperText}>
            Enter name of the dish you wish to add to the menu
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter dish name"
            placeholderTextColor="#999"
            value={dishName}
            onChangeText={setDishName}
          />

          <Text style={styles.label}>Description :</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your culinary creation"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Course :</Text>
          <View style={styles.courseSelection}>
            {COURSES.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.courseChip,
                  course === c.id && styles.courseChipActive,
                ]}
                onPress={() => setCourse(c.id)}
              >
                <Text style={styles.courseChipIcon}>{c.icon}</Text>
                <Text style={[
                  styles.courseChipText,
                  course === c.id && styles.courseChipTextActive,
                ]}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Price :</Text>
          <View style={styles.priceInput}>
            <Text style={styles.currencySymbol}>R</Text>
            <TextInput
              style={styles.priceInputField}
              placeholder="0.00"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <TouchableOpacity
            style={styles.addToMenuButton}
            onPress={handleAddDish}
          >
            <Text style={styles.addToMenuButtonText}>Add to Menu</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
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
  featureCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  featureButton: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  featureButtonIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  featureButtonTextContainer: {
    flex: 1,
  },
  featureButtonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  featureButtonText: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
  },
  startButton: {
    backgroundColor: '#E8A87C',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  createDishButton: {
    backgroundColor: '#E8A87C',
    borderWidth: 0,
  },
  startButtonText: {
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
  headerIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  menuIconButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  backButton: {
    fontSize: 28,
    color: '#1a1a1a',
    marginRight: 10,
  },
  saveButton: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  statsCard: {
    backgroundColor: '#E8A87C',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statsLabel: {
    fontSize: 12,
    color: '#1a1a1a',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8A87C',
    margin: 20,
    marginTop: 10,
    padding: 15,
    borderRadius: 25,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#666',
    fontSize: 14,
  },
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  categoryTab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#2a2a2a',
    marginRight: 10,
    marginBottom: 10,
  },
  categoryTabActive: {
    backgroundColor: '#E8A87C',
  },
  categoryTabText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryTabTextActive: {
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
  formContainer: {
    flex: 1,
    padding: 20,
  },
  createNewButton: {
    flexDirection: 'row',
    backgroundColor: '#E8A87C',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  createNewIcon: {
    fontSize: 30,
    marginRight: 15,
    color: '#1a1a1a',
  },
  createNewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  createNewText: {
    fontSize: 12,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  courseSelection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  courseChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  courseChipActive: {
    backgroundColor: '#E8A87C',
  },
  courseChipIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  courseChipText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  courseChipTextActive: {
    color: '#1a1a1a',
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 30,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  priceInputField: {
    flex: 1,
    padding: 15,
    color: '#fff',
    fontSize: 14,
  },
  addToMenuButton: {
    backgroundColor: '#E8A87C',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  addToMenuButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  menuStatsHome: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#444',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuStatsLabel: {
    fontSize: 14,
    color: '#999',
    marginRight: 10,
  },
  menuStatsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E8A87C',
  },
});

export default App;