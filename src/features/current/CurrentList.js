import { Fragment } from "react";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { useState } from "react";
import { categoryList } from '../../app/categoryList';

// styles
import "./CurrentList.scss";

function CurrentList(props) {
  const [currentCategory, setCurrentCategory] = useState('all');

  const categoryFilter = (items) => {
    if (currentCategory === "all") return items;
    return items.filter((item) => {
      return item.category === currentCategory;
    });
  };
  const list = categoryFilter(useSelector((state) => state.current));

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };

  const items = list.map((item, index) => {
    const date = DateTime.fromFormat(item.date, "yyyy-MM-dd").toFormat("MM/dd");
    const category = categoryList.find(category => category.value === item.category);
    return (
      <li className="budget-list__item" key={index}>
        <span className="budget-list__date">{date}</span>
        <span className="budget-list__price">
          ¥{parseInt(item.price).toLocaleString()}
        </span>
        <span className="budget-list__desc">{item.desc}</span>
        <span className={`budget-list__category ${item.category}`}>
          {category.name}
        </span>
      </li>
    );
  });

  const priceSum = list.reduce((acc, val) => {
    return acc + parseInt(val.price);
  }, 0);

  const categoryOptions = categoryList.map(category => {
    return <option className="budget-category__option" value={category.value} key={category.value}>{category.name}</option>;
  });

  return (
    <Fragment>
      <div className="budget-list__header">
        <span className="price-sum">合計: ¥{priceSum.toLocaleString()}</span>
        カテゴリーを選択：
        <select
          className={`budget-category__select ${currentCategory}`}
          value={currentCategory}
          onChange={handleCategoryChange}
        >
          <option className="budget-category__option" value="all">
            全てのカテゴリー
          </option>
          { categoryOptions }
        </select>
      </div>
      <ul className="budget-list__body">{items}</ul>
    </Fragment>
  );
}

export default CurrentList;