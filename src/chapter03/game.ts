import { Container } from '~gamelib/entities/Container';
import { Text } from '~gamelib/entities/Text';

const cont = new Container();
cont.label = 'container superior';

const cont2 = new Container();
cont2.label = 'container 2';
cont.add(cont2);

const cont3 = new Container();
cont3.label = 'container 3';
cont2.add(cont3);

const text = new Text('patata');
cont.add(text);

cont.update(10, 100);
