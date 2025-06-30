const ProductListForm = ({ products, onProductChange, onAddProduct }) => {
    return (
        <div className="container mt-3 mb-3" 
        // style={{ border: '1px solid #ccc' , borderRadius: '8px' , borderRight: '0px'}}
        >
            <h5>Product List</h5>
            {products.map((product, index) => (
                <div className="row mb-3" key={index}>
                    <div className="col" style={{padding: "2px"}}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Product Name"
                            // value={product.name}
                            onChange={(e) => onProductChange(index, 'productName', e.target.value)}
                            // required
                        />
                    </div>
                    <div className="col" style={{padding: "2px"}}>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            // value={product.price}
                            onChange={(e) => onProductChange(index, 'pricePerUnit', e.target.value)}
                            // required
                        />
                    </div>
                    <div className="col" style={{padding: "2px"}}>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Minimum Quantity"
                            // value={product.nimQty}
                            onChange={(e) => onProductChange(index, 'minQuantity', e.target.value)}
                            // required
                        />
                    </div>
                </div>
            ))}

            <div className="bm-3 text-end">
                <button
                    type="button"
                    className="btn mb-3 btn-outline-secondary"
                    onClick={onAddProduct}
                >
                    + Add Product
                </button>
            </div>
        </div>

    );
}

export default ProductListForm;

