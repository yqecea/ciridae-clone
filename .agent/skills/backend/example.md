<example>
❌ SLOP:
async def get_orders(user_id):
    orders = await db.query(f"SELECT * FROM orders WHERE user_id = {user_id}")
    for order in orders:
        order.product = await api.get(order.product_id)
    return orders

✅ S-TIER:
async def get_orders(
    user_id: str, 
    limit: int = 20,
    ctx: Context
) -> OrdersResponse:
    """Fetch orders with product enrichment. Degrades gracefully if products unavailable."""
    
    # [BOUND] Clamp to prevent memory issues at scale
    limit = min(limit, 100)
    
    # [EDGE:EMPTY] Early return for empty case
    orders = await repo.list(user_id, limit, timeout=ctx.budget(70), cid=ctx.cid)
    if not orders.items:
        return OrdersResponse(data=[], cursor=None, has_more=False)
    
    # [EDGE:PARTIAL] Products enrichment is degradable—partial success > total failure
    products = {}
    try:
        products = await products_client.batch_get(
            [o.product_id for o in orders.items],
            timeout=ctx.budget(40), cid=ctx.cid
        )
    except (TimeoutError, CircuitOpenError) as e:
        # Log for debugging, but continue with unenriched orders
        logger.warning("products_degraded", cid=ctx.cid, error=str(e))
        # NOTE: If this happens frequently, add Redis cache for products
    
    return OrdersResponse(
        data=[enrich(o, products.get(o.product_id)) for o in orders.items],
        cursor=orders.cursor,
        has_more=orders.has_more
    )
</example>
