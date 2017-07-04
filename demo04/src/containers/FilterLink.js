import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

//建立state对象到props对象的映射关系
//mapStateToProps会订阅 Store，每当state更新的时候，
//就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染
/*  <FilterLink filter="SHOW_ALL">
        All
    </FilterLink>
    ownProps.filter 为"SHOW_ALL"
*/
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})
//用来建立 UI 组件的参数到store.dispatch方法的映射
//dispatch和ownProps（容器组件的props对象）两个参数

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)             //用Link组件生成容器组件，容器组件负责逻辑

export default FilterLink
