"""added ticket fields

Revision ID: 63410d5a7311
Revises: 5cd83f14e6cf
Create Date: 2024-11-27 23:23:07.955471

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63410d5a7311'
down_revision = '5cd83f14e6cf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ticket_price', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('total_tickets', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('remaining_tickets', sa.Integer(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_column('remaining_tickets')
        batch_op.drop_column('total_tickets')
        batch_op.drop_column('ticket_price')

    # ### end Alembic commands ###
