import Close from '../../assets/xmark.svg';
import Bold from '../../assets/bold.svg';
import Italic from '../../assets/italic.svg';
import Strikethrough from '../../assets/strikethrough.svg';
import Send from '../../assets/circle-chevron-right.svg'
import UsersGroup from '../../assets/UserGroup.svg';
import CheckedEnvelope from '../../assets/CheckedEnvelope.svg';
import AddPerson from '../../assets/add-person.svg';
import WindowRestoreSolid from '../../assets/WindowRestoreSolid.svg';
import Reply from '../../assets/reply.svg';

export enum Icons {
  bold = 'bold',
  italic = 'italic',
  strikethrough = 'strikethrough',
  xmark = 'xmark',
  send = 'send',
  usersGroup = 'usersGroup',
  checkedEnvelope = 'checkedEvelope',
  addPerson = 'addPerson',
  newWindow = 'newWindow',
  replyArrow = 'replyArrow',
};

export const IconsData = {
  [Icons.bold]: Bold,
  [Icons.italic]: Italic,
  [Icons.strikethrough]: Strikethrough,
  [Icons.xmark]: Close,
  [Icons.send]: Send,
  [Icons.usersGroup]: UsersGroup,
  [Icons.checkedEnvelope]: CheckedEnvelope,
  [Icons.addPerson]: AddPerson,
  [Icons.newWindow]: WindowRestoreSolid,
  [Icons.replyArrow]: Reply
}
