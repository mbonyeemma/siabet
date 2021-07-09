import { StyleSheet } from 'react-native';
import theme from '../model/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    fontFamily: theme.fonts.regular,
    backgroundColor: theme.colors.grayLight
  },
  navigationButtonContainer: {
    height: '10%'
  },
  navigationButton: {
    padding: 10,
    backgroundColor: theme.colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '5%',
    paddingLeft: 20,
    backgroundColor: theme.colors.lightGreen
  },
  titleTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    marginLeft: 10,
    fontFamily: theme.fonts.semibold,
    fontSize: theme.fonts.base + 2,
    color: theme.colors.white
  },
  groupText: {
    marginLeft: 5,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fonts.base + 2,
    color: theme.colors.white
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    margin: '5%',
    alignItems: 'flex-end'
    },
  textInputContainer: {
    flex: 3,
    marginLeft: 15
  },
  accountNameText: {
    flex: 1.8,
    fontSize: theme.fonts.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
    paddingLeft: 4
  },
  accountNameTextInput: {
    flex: 2,
    fontSize: theme.fonts.base + 2,
    fontFamily: theme.fonts.regular,
    paddingBottom: 0,
    borderBottomColor: theme.colors.darkerGray,
    borderBottomWidth: 1
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  jointMembersContainer: {
    width: '100%',
    marginTop: '2%',
    height: '20%',
    borderTopColor: theme.colors.darkerGray
  },
  addMembersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  membersText: {
    fontSize: theme.fonts.base + 2,
    fontFamily: theme.fonts.regular,
    marginLeft: '5%'
  },
  addBtnText: {
    fontSize: theme.fonts.base + 2,
    fontFamily: theme.fonts.regular,
    color: theme.colors.blue,
    marginRight: '5%'
  },
  membersPicturesContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%'
  },
  regularBaseFonted: {
    fontSize: theme.fonts.base,
    fontFamily: theme.fonts.regular
  },
  customAccountContentTitle: {
    fontSize: theme.fonts.base + 2,
    fontFamily: theme.fonts.regular,
    color: theme.colors.darkerGray
  },
  successModalContainer: {
    flexDirection: 'row',
    height: '100%',
    borderWidth: 1,
    borderColor: theme.colors.darkGray,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionText: {
    fontSize: theme.fonts.base,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.black
  },
  spacedPadding: {
    paddingLeft: '5%',
    paddingRight: '10%'
  },
  otherPermissionItem: {
    marginLeft: '7%',
    marginRight: '7%',
    borderBottomColor: theme.colors.darkGray,
    borderBottomWidth: 1
  },
  buttonTextStyles: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fonts.base + 2
  },
  activeButtonStyles: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.darkGray,
    borderRadius: 10
  },
  navigationButtonScroll: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  strongTextDescription: {
    fontFamily: theme.fonts.semibold,
    color: theme.colors.black,
    paddingLeft: 1
  },
  jointTitleContainer: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '8%'
  }
});
