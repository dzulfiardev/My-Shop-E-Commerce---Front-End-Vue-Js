<template>
  <v-app>
    <Navigation />
    <v-main>
      <v-container fluid class="px-10">
        <h1>Product</h1>
        <v-card class="mt-5">
          <v-card-title>
            <v-row>
              <v-col cols="12" md="3">
                <v-select
                  label="Category"
                  :items="categorySelect"
                  item-value="value"
                  item-text="text"
                  dense
                  outlined
                  v-model="categorySelectBox"
                  @change="findByCategory(categorySelectBox)"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6"></v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="table.search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-title>
            <v-btn dark @click="dialog"> Add Product </v-btn>
          </v-card-title>

          <v-data-table
            :loading="table.loading"
            loading-text="Loading... Please wait"
            :headers="tableHead"
            :search="table.search"
            :items="table.product"
            :sort-desc="true"
            :sort-by="'uid'"
            class="elevation-2"
            item-key="name"
            v-model="table.selected"
          >
            <!-- Status -->
            <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getStatus(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>
            <!-- End Status -->

            <!-- Table Image -->
            <template v-slot:[`item.image`]="{ item }">
              <v-avatar rounded size="55" class="my-2">
                <img
                  :src="
                    item.image ==
                    'http://127.0.0.1:8000/assets/image/product/default.jpg'
                      ? 'http://via.placeholder.com/70'
                      : item.image
                  "
                  :alt="item.fullname"
                  style="object-fit: cover; object-position: center"
                />
              </v-avatar>
            </template>
            <!-- End Table Image -->

            <!-- Action Button -->
            <template v-slot:[`item.action`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="editItem(item, item.id)"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Edit {{ item.product }}</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-if="
                      session.role == 'superadmin' || session.role == 'admin'
                    "
                    v-on="on"
                    v-bind="attrs"
                    color="red"
                    @click="deleteItem(item.id, item.product, item.uid)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span>Delete {{ item.product }}</span>
              </v-tooltip>
            </template>
            <!-- End Action Button -->
          </v-data-table>

          <AddProductDialog
            :addDialog="addDialog"
            :input="input"
            :rules="rules"
            :editorOption="editorOption"
            @closeDialog="closeDialog"
            @showDataTable="showDataTable"
          />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "../../components/Main/Navigation.vue";
import AddProductDialog from "../../components/Main/Products/AddProductDialog.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  title: "Product - My Shop",
  data() {
    return {
      addDialog: false,
      productId: 0,
      categorySelectBox: "",
      productData: [],
      tableHead: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "uid",
        },
        { text: "Image", value: "image" },
        { text: "Product", value: "product" },
        { text: "Status", value: "status" },
        { text: "Quantity", value: "quantity" },
        { text: "Category", value: "category" },
        { text: "Action", value: "action" },
      ],
      table: {
        product: [],
        search: "",
        loading: true,
        selected: [],
      },
      input: {
        action: "create",
        id: 0,
        name: "",
        description: "",
        price: "",
        discount: "",
        image: null,
        imageProduct: "",
        oldImage: "",
        quantity: "",
        barcode: "",
        weight: "",
        status: "",
        vendor: "",
        category: "",
      },
      rules: {
        name: [],
        description: [],
        price: [],
        image: [],
        quantity: [],
        barcode: [],
        weight: [],
        status: [],
        vendor: [],
        category: [],
        errorMessages: "",
        formHasErrors: "",
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
        },
      },
    };
  },
  components: {
    Navigation,
    AddProductDialog,
  },
  computed: {
    ...mapGetters("auth", {
      session: "getUser",
    }),
    ...mapGetters("product", {
      categories: "getCategoryProduct",
    }),
    ...mapGetters("productManage", {
      categorySelect: "getCategories",
    }),
  },
  methods: {
    dialog() {
      this.addDialog = true;
    },
    closeDialog() {
      this.addDialog = false;
      this.input.name = "";
      this.input.description = "";
      this.input.price = "";
      this.input.discount = "";
      this.input.image = null;
      this.input.imageProduct = "";
      this.input.quantity = "";
      this.input.barcode = "";
      this.input.weight = "";
      this.input.status = "";
      this.input.vendor = "";
      this.input.category = "";
    },
    showDataTable() {
      this.$restrictApi
        .get("/products")
        .then((res) => {
          this.productData = res.data.map((data) => {
            return {
              id: data.id,
              categoryId: data.category_id,
              uid: data.product_uid,
              image: data.product_image_url,
              product: data.product_name,
              status: data.product_status,
              quantity: data.product_quantity,
              category: data.category_name,
            };
          });
          this.table.product = this.productData;
          this.table.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findByCategory(id) {
      const product = this.productData;
      if (id == "all") {
        return (this.table.product = product);
      }
      this.table.product = product.filter((data) => {
        return data.categoryId === id;
      });
    },
    getStatus(status) {
      if (status == "Active") return "green";
      else return "red";
    },
    editItem(product, id) {
      this.table.loading = true;
      this.input.action = "update";

      this.$restrictApi
        .get(`/product/${id}`)
        .then((res) => {
          this.addDialog = true;
          this.table.loading = false;

          this.input.id = res.data.id;
          this.input.name = res.data.product_name;
          this.input.description = res.data.product_content;
          this.input.price = res.data.product_price;
          this.input.discount = res.data.product_discount;
          this.input.imageProduct = res.data.product_image_url;
          this.input.oldImage = res.data.product_image;
          this.input.quantity = res.data.product_quantity;
          this.input.barcode = res.data.product_barcode;
          this.input.weight = res.data.product_weight;
          this.input.status = res.data.product_status;
          this.input.vendor = res.data.product_vendor;
          this.input.category = res.data.category_id;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    deleteItem(id, product, uid) {
      // this.table.loading = true;
      Swal.fire({
        title: "Are you sure?",
        html: `Are You Sure to Product: <b>${product}, UID: <b>${uid}</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // do this execute
          this.$restrictApi
            .delete("/product/" + id)
            .then((res) => {
              let msg = "";
              let title = "";
              let icon = "";
              if (res.data.success) {
                title = "Success!";
                msg = res.data.success;
                icon = "success";
                this.showDataTable();
              }
              if (res.data.activeItem) {
                title = "Warning!";
                msg = res.data.activeItem;
                icon = "warning";
              }
              Swal.fire(title, msg, icon);
            })
            .catch((err) => {
              this.overlayDelete = false;
              console.log(err.response);
            });
        }
      }); // End sweet Alert
    },
    formatCurrency(price) {
      price = price / 100;
      return price.toLocaleString("en-US");
    },
  },
  mounted() {
    this.showDataTable();
    this.$store.dispatch("productManage/categories");
  },
};
</script>

<style>
</style>