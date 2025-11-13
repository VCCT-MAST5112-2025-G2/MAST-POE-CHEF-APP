// screens/ManageMenuScreen.tsx
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
import { MenuItem } from '../types';
import { COURSES } from '../constants';

interface ManageMenuScreenProps {
  menuItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
}

const ManageMenuScreen: React.FC<ManageMenuScreenProps> = ({
  menuItems,
  onAddItem,
  onRemoveItem,
  onBack,
}) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showAddForm, setShowAddForm] = useState(false);

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

    onAddItem(newItem);

    // Show success feedback
    Alert.alert(
      'Success! 🎉',
      `${newItem.name} has been added to the ${COURSES.find((c) => c.id === course)?.name} menu.`,
      [
        {
          text: 'Add Another',
          onPress: () => {
            setDishName('');
            setDescription('');
            setCourse('');
            setPrice('');
            setErrors({});
          },
        },
        {
          text: 'Done',
          onPress: () => {
            setDishName('');
            setDescription('');
            setCourse('');
            setPrice('');
            setErrors({});
            setShowAddForm(false);
          },
        },
      ]
    );
  };

  const handleRemoveItem = (item: MenuItem) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${item.name}" from the menu?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            onRemoveItem(item.id);
            Alert.alert('Removed', `${item.name} has been removed from the menu.`);
          },
        },
      ]
    );
  };

  const getItemsByCourse = (courseId: string) => {
    return menuItems.filter((item: MenuItem) => item.course === courseId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainScreen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Manage Menu</Text>
          <TouchableOpacity onPress={() => setShowAddForm(!showAddForm)}>
            <Text style={styles.addButton}>{showAddForm ? 'Cancel' : '+ Add'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {showAddForm && (
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Add New Dish</Text>

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
                    <Text
                      style={[
                        styles.courseChipText,
                        course === c.id && styles.courseChipTextActive,
                      ]}
                    >
                      {c.name}
                    </Text>
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

              <TouchableOpacity style={styles.addToMenuButton} onPress={handleAddDish}>
                <Text style={styles.addToMenuButtonText}>Add to Menu</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.menuListContainer}>
            <Text style={styles.sectionTitle}>Current Menu Items</Text>
            {menuItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No menu items yet. Add your first dish!</Text>
              </View>
            ) : (
              COURSES.map((courseItem) => {
                const items = getItemsByCourse(courseItem.id);
                if (items.length === 0) return null;

                return (
                  <View key={courseItem.id} style={styles.courseSection}>
                    <View style={styles.courseSectionHeader}>
                      <Text style={styles.courseSectionIcon}>{courseItem.icon}</Text>
                      <Text style={styles.courseSectionTitle}>{courseItem.name}</Text>
                      <Text style={styles.courseSectionCount}>({items.length})</Text>
                    </View>
                    {items.map((item: MenuItem) => (
                      <View key={item.id} style={styles.menuItem}>
                        <View style={styles.menuItemContent}>
                          <View style={styles.menuItemHeader}>
                            <Text style={styles.menuItemName}>{item.name}</Text>
                            <View style={styles.priceTag}>
                              <Text style={styles.priceTagText}>R{item.price.toFixed(2)}</Text>
                            </View>
                          </View>
                          <Text style={styles.menuItemDescription}>{item.description}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => handleRemoveItem(item)}
                        >
                          <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                );
              })
            )}
          </View>
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
  backButton: {
    fontSize: 28,
    color: '#1a1a1a',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  addButton: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
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
    backgroundColor: '#1a1a1a',
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
    backgroundColor: '#1a1a1a',
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
    backgroundColor: '#1a1a1a',
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
    marginTop: 10,
  },
  addToMenuButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  menuListContainer: {
    marginTop: 10,
  },
  courseSection: {
    marginBottom: 25,
  },
  courseSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  courseSectionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  courseSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E8A87C',
    marginRight: 10,
  },
  courseSectionCount: {
    fontSize: 14,
    color: '#999',
  },
  menuItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemContent: {
    flex: 1,
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
  removeButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
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
});

export default ManageMenuScreen;

