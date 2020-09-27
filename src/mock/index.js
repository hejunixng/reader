import Mock from 'mockjs';

import home from './bookHome';
import shelf from './bookShelf';
import list from './bookList';
import faltList from './bookFlatList';

// url为/book/home访问，就会访问到home的数据
Mock.mock(/\/book\/home/,'get',home);
Mock.mock(/\/book\/shelf/,'get',shelf);
Mock.mock(/\/book\/list/,'get',list);
Mock.mock(/\/book\/falt-list/,'get',faltList);