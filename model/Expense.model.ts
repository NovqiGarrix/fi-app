import { Model } from '@nozbe/watermelondb'
import { date, field, relation, text } from '@nozbe/watermelondb/decorators'

class Expense extends Model {
    static table = 'expenses'

    static associations = {
        categories: { type: 'belongs_to', key: 'category_id' },
    }

    @text('title') title
    @field('amount') amount
    @relation('categories', 'category_id') category
    @date('created_at') createdAt
}

export default Expense