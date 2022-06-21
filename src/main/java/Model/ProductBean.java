package Model;

public class ProductBean {
    private int id ;
    private CategoryBean category_id;
    private String name,description,image;
    private double price,weight;

    public ProductBean() {
    }

    public ProductBean(int id, CategoryBean category_id, String name, String description, String image, double price, double weight) {
        this.id = id;
        this.category_id = category_id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.weight = weight;
    }

    public ProductBean(CategoryBean category_id, String name, String description, String image, double price, double weight) {
        this.category_id = category_id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.weight = weight;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CategoryBean getCategory_id() {
        return category_id;
    }

    public void setCategory_id(CategoryBean category_id) {
        this.category_id = category_id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
