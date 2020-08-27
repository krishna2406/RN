import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Button, Text, TextInput, Image, ScrollView } from 'react-native';
import axiosInstance from './service/config-axios';
import ex4m from './assets/mock/ec4m.json';
import { Card, CardItem, Body } from 'native-base';

const Separator = () => (
  <View style={styles.separator} />
);

const App = () => {
  const [outCode, setOutCode] = useState('');
  const [restaurantList, setRestaurantList] = useState([]);
  const [showRestuarant, setShowRestaurant] = useState(false);
  const [showRestuarantDetail, setShowRestuarantDetail] = useState(false);
  const [restaurantDetail, setrestaurantDetail] = useState({});

  const searchPostcode = () => {
    setShowRestaurant(false);
    // axiosInstance.get(`restaurants/bypostcode/${outcode}`)
    //   .then(response => {

    //   }).catch(error => {

    //   });
    setRestaurantList([]);
    let items = [];
    for (let count = 0; count < 10; count++) {
      items.push(ex4m.Restaurants[count]);
    }
    setRestaurantList(items);
    setShowRestaurant(true);
  }

  const restaurantHandler = (data) => {
    setShowRestaurant(false);
    setShowRestuarantDetail(true);
    setrestaurantDetail(data);
  }

  const backToRestaurant = () => {
    setShowRestaurant(true);
    setShowRestuarantDetail(false);
  }

  return (
    <SafeAreaView>
      <View style={{ paddingTop: 10 }}>
        <TextInput
          style={{ marginBottom: 5, marginLeft: 5, marginRight: 5, height: 40, borderColor: 'gray', borderWidth: 1, alignItems: 'center' }}
          onChangeText={text => setOutCode(text)}
          value={outCode}
          placeholder="Enter outcode"
        />
        <Button
          title="Search"
          onPress={searchPostcode}
        />
      </View>
      <Separator />
      <ScrollView>
        {showRestuarant &&
          <View>
            {restaurantList.map((item, index) => {
              return (
                <Card key={index}>
                  <CardItem header>
                    <Text style={{ fontWeight: "bold" }}>{item.Name}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Image style={styles.logo} source={{ uri: item.LogoUrl }} />
                      <Text>
                        Star Rating: {item.RatingStars}
                      </Text>
                    </Body>
                  </CardItem>
                  <Button
                    title="View More <>"
                    onPress={() => restaurantHandler(item)}
                  />
                </Card>
              );
            })}
          </View>}
      </ScrollView>
      {showRestuarantDetail &&
        <View>
          <Card>
            <CardItem header >
              <Text style={{ fontWeight: "bold" }}>Restaurant Details</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Image style={styles.logo} source={{ uri: restaurantDetail.LogoUrl }} />
                <Text>
                  Name: {restaurantDetail.Name}
                </Text>
                <Text>
                  Cuisine Type: {restaurantDetail.CuisineTypes.map(item => item.SeoName).join(', ')}
                </Text>
                <Text>
                  Star Rating: {restaurantDetail.RatingStars}
                </Text>
                <Text>
                  Opening Time: {new Date(restaurantDetail.OpeningTime).getHours()}:{new Date(restaurantDetail.OpeningTime).getMinutes()}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Delivery Time: {new Date(restaurantDetail.DeliveryOpeningTime).getHours()}:{new Date(restaurantDetail.DeliveryOpeningTime).getMinutes()}
                </Text>
                <Button
                  title="Back To Restaurants"
                  onPress={backToRestaurant}
                />
              </Body>
            </CardItem>
          </Card>
        </View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: 66,
    height: 58,
  }
});

export default App;