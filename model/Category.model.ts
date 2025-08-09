import { Model } from '@nozbe/watermelondb'
import { children, text } from '@nozbe/watermelondb/decorators'

class Category extends Model {
    static table = 'categories'

    static associations = {
        expenses: { type: 'has_many', foreignKey: 'category_id' },
    }

    @text('name') name
    @text('color') color

    @children('expenses') expenses
}

export default Category