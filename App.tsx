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
  Alert,
} from 'react-native';
import { MenuItem } from './types';
import { COURSES } from './constants';
import AppetizersScreen from './screens/AppetizersScreen';
import MainsScreen from './screens/MainsScreen';
import DessertsScreen from './screens/DessertsScreen';
import BeveragesScreen from './screens/BeveragesScreen';
import SpecialsScreen from './screens/SpecialsScreen';

const App = () => {
  const [screen, setScreen] = useState<'home' | 'main' | 'appetizers' | 'mains' | 'desserts' | 'beverages' | 'specials' | 'add'>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // Form state
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!dishName.trim()) {
      newErrors.dishName = 'Dish name is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!course) {
      newErrors.course = 'Please select a course';
    }

    if (!price.trim()) {
      newErrors.price = 'Price is required';
    } else {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = 'Please enter a valid price greater than 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDish = () => {
    if (!validateForm()) {
      Alert.alert(
        'Validation Error',
        'Please fill in all fields correctly before adding the dish.',
        [{ text: 'OK' }]
      );
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: dishName.trim(),
      description: description.trim(),
      course: course,
      price: parseFloat(price),
    };
    
    setMenuItems([...menuItems, newItem]);
    
    // Show success feedback
    Alert.alert(
      'Success! 🎉',
      `${newItem.name} has been added to the ${COURSES.find(c => c.id === course)?.name} menu.`,
      [
        {
          text: 'Add Another',
          onPress: () => {
            // Reset form but stay on add screen
            setDishName('');
            setDescription('');
            setCourse('');
            setPrice('');
            setErrors({});
          },
        },
        {
          text: 'View Menu',
          onPress: () => {
            // Reset form and go to main screen
            setDishName('');
            setDescription('');
            setCourse('');
            setPrice('');
            setErrors({});
            setScreen('main');
          },
        },
      ]
    );
  };

  const getItemsByCourse = (courseName: string) => {
    return menuItems.filter((item: MenuItem) => item.course === courseName);
  };

  const getTotalItems = () => menuItems.length;

  const getAveragePrice = () => {
    if (menuItems.length === 0) return '0.00';
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
            onPress={() => setScreen('add')}
          >
            <Text style={styles.addDishButtonText}>Add Dish</Text>
          </TouchableOpacity>
        </View>
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
            style={[styles.input, errors.dishName ? styles.inputError : null]}
            placeholder="Enter dish name"
            placeholderTextColor="#999"
            value={dishName}
            onChangeText={(text) => {
              setDishName(text);
              if (errors.dishName) {
                setErrors({ ...errors, dishName: '' });
              }
            }}
          />
          {errors.dishName && (
            <Text style={styles.errorText}>{errors.dishName}</Text>
          )}

          <Text style={styles.label}>Description :</Text>
          <Text style={styles.helperText}>
            Describe your culinary creation (minimum 10 characters)
          </Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.description ? styles.inputError : null]}
            placeholder="Describe your culinary creation"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) {
                setErrors({ ...errors, description: '' });
              }
            }}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

          <Text style={styles.label}>Course :</Text>
          {errors.course && (
            <Text style={styles.errorText}>{errors.course}</Text>
          )}
          <View style={styles.courseSelection}>
            {COURSES.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.courseChip,
                  course === c.id && styles.courseChipActive,
                ]}
                onPress={() => {
                  setCourse(c.id);
                  if (errors.course) {
                    setErrors({ ...errors, course: '' });
                  }
                }}
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
          <Text style={styles.helperText}>
            Enter the price in Rands (e.g., 150.00)
          </Text>
          <View style={[styles.priceInput, errors.price ? styles.inputError : null]}>
            <Text style={styles.currencySymbol}>R</Text>
            <TextInput
              style={styles.priceInputField}
              placeholder="0.00"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={(text) => {
                setPrice(text);
                if (errors.price) {
                  setErrors({ ...errors, price: '' });
                }
              }}
            />
          </View>
          {errors.price && (
            <Text style={styles.errorText}>{errors.price}</Text>
          )}

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
    marginBottom: 5,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginBottom: 15,
    marginTop: -10,
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
    marginBottom: 5,
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
