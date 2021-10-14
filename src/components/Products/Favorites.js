import React from 'react';
import {
    ActivityIndicator, View, Text,
    TouchableWithoutFeedback, StyleSheet, Image, SectionList
} from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import {
    getProducts,
    selectProduct
} from '../../actions';

import {
    mOrange, mGrey, sLightGrey, sSalmon
} from 'styles/Styles';

import search from '../../../assets/img/common/search.png';

class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        }
        this.props.getProducts();
    }

    changeSearch = (searchText) => {
        this.setState({ searchText })
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    getFilterData = () => {
        const { productArray } = this.props;
        const { searchText } = this.state;

        if (productArray && productArray.length) {
            let data = productArray.filter(item => {
                if (item.favorite) {
                    return item
                }
            });

            if (searchText) {
                let filterData = null;
                let dataList = data ? data : productArray;

                filterData = dataList.filter(item => {
                    let fullName =
                        `${item.name.toLowerCase()} ${item.name && item.name.toLowerCase()}`;
                    if (fullName.includes(searchText.toLowerCase())) {
                        return item
                    }
                });

                data = filterData;
            }

            var groups = {};
            data.sort(function (a, b) {
                if (a.category.toLowerCase() < b.category.toLowerCase()) { return -1; }
                if (a.category.toLowerCase() > b.category.toLowerCase()) { return 1; }
                return 0;
            })

            data.forEach(function (item) {
                const name = item.category;
                if (!groups[name]) {
                    groups[name] = [];
                }
                groups[name].push(item);
            });

            return Object.keys(groups).map((name) => {
                return {
                    name,
                    data: groups[name]
                };
            });
        }

        return [];
    }

    selectProduct = async (product) => {
        await this.props.selectProduct(product);
        this.props.navigation.navigate("ProductDetail")
    }

    getProductsList = () => {
        return (
            <SectionList
                ref={(ref) => {
                    this.ListView_Ref = ref;
                }}
                initialNumToRender={50}
                keyExtractor={(item, index) => index}
                keyboardShouldPersistTaps="always"
                sections={this.getFilterData()}
                stickySectionHeadersEnabled="true"
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.selectProduct(item)}>
                <View style={{
                    borderColor: sSalmon, borderWidth: 0.5, marginVertical: 5, padding: 5,
                    flexDirection: 'row', flex: 1
                }}>
                    <Image source={{ uri: item.image }} style={{ width: 30, height: 30 }} />

                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
                        <Text>{item.name}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const { productsLoading } = this.props;
        const { searchText } = this.state;

        return (
            <View style={styles.screen}>
                <View style={{ marginHorizontal: 20, flex: 1, marginBottom: 30 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={this.goBack}>
                            <Text style={{ fontWeight: 'bold' }}>Back</Text>
                        </TouchableWithoutFeedback>

                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Favorites</Text>
                    </View>
                    <View style={[
                        styles.passwordSectionStyle, { borderWidth: 0.7, borderColor: mGrey }]}>
                        <TextInput
                            ref={this.inputRef}
                            autoCapitalize="none"
                            autoCorrect={false}
                            label={'Search'}
                            onChangeText={this.changeSearch}
                            style={styles.textInput}
                            theme={{ colors: { primary: mOrange } }}
                            underlineColor="transparent"
                            value={searchText}
                        />

                        <Image
                            source={search}
                            style={[styles.imageStyle, { marginRight: 10 }]}
                        />
                    </View>

                    {productsLoading &&
                        <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator animating={true} size={100} color="#DF703D" />
                        </View>
                    }
                    {!productsLoading && this.getProductsList()}
                </View>
            </View>
        )
    }
}



function mapStateToProps({ products }) {
    const {
        productArray,
        productsLoading
    } = products

    return {
        productArray,
        productsLoading
    };
}

export default connect(mapStateToProps, {
    getProducts,
    selectProduct
})(Category);


const styles = StyleSheet.create({
    imageStyle: {
        alignItems: 'center',
        height: 20,
        width: 20,
    },

    passwordSectionStyle: {
        alignItems: 'center',
        backgroundColor: '#F3F2F7',
        borderColor: 'red',
        borderRadius: 5,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 25
    },

    screen: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 40,
    },

    textInput: {
        backgroundColor: '#F3F2F7',
        borderRadius: 5,
        borderWidth: 0,
        color: '#000',
        flex: 1,
        fontSize: 16,
        height: 50,
        paddingLeft: 10,
    },

    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
});