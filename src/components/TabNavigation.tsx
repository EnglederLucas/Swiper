// import * as React from "react";
// import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
// import {
//   useNavigationBuilder,
//   DefaultNavigatorOptions,
//   TabRouter,
//   TabActions,
//   TabActionHelpers,
//   TabRouterOptions,
//   TabNavigationState,
//   createNavigatorFactory,
//   ParamListBase,
// } from "@react-navigation/native";
// import { AuthenticationStackParameterList } from "../../App";

// // Props accepted by the view
// type TabNavigationConfig = {
//   tabBarStyle: StyleProp<ViewStyle>;
//   contentStyle: StyleProp<ViewStyle>;
// };

// // Supported screen options
// type TabNavigationOptions = {
//   title?: string;
// };

// // Map of event name and the type of data (in event.data)
// //
// // canPreventDefault: true adds the defaultPrevented property to the
// // emitted events.
// type TabNavigationEventMap = {
//   tabPress: {
//     data: { isAlreadyFocused: boolean };
//     canPreventDefault: true;
//   };
// };

// // The props accepted by the component is a combination of 3 things
// type Props = DefaultNavigatorOptions<TabNavigationOptions> &
//   TabRouterOptions &
//   TabNavigationConfig;

// function TabNavigator({
//   initialRouteName,
//   children,
//   screenOptions,
//   tabBarStyle,
//   contentStyle,
// }: Props) {
//   const { state, navigation, descriptors } = useNavigationBuilder<
//     TabNavigationState,
//     TabRouterOptions,
//     TabActionHelpers<ParamListBase>,
//     TabNavigationOptions
//   >(TabRouter, {
//     children,
//     // screenOptions,
//     initialRouteName,
//   });

//   return (
//     <React.Fragment>
//       <View style={[{ flexDirection: "row" }, tabBarStyle]}>
//         {state.routes.map(route => (
//           <TouchableOpacity
//             key={route.key}
//             onPress={() => {
//               const event = navigation.emit({
//                 type: "title",
//                 target: route.key,
//                 data: {
//                   isAlreadyFocused: route.key === state.routes[state.index].key,
//                 },
//               });

//               if (!event.defaultPrevented) {
//                 navigation.dispatch({
//                   ...TabActions.jumpTo(route.name),
//                   target: state.key,
//                 });
//               }
//             }}
//             style={{ flex: 1 }}>
//             <Text>{descriptors[route.key].options.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <View style={[{ flex: 1 }, contentStyle]}>
//         {descriptors[state.routes[state.index].key].render()}
//       </View>
//     </React.Fragment>
//   );
// }

// export default createNavigatorFactory<
//   TabNavigationState,
//   TabNavigationOptions,
//   TabNavigationEventMap,
//   typeof TabNavigator
// >(TabNavigator);
