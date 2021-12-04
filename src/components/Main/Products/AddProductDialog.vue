<template>
  <v-dialog
    v-model="addDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-overlay :value="dialogOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-card>
      <v-toolbar dark>
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Product</v-toolbar-title>
      </v-toolbar>
      <!-- End toolbar -->

      <!-- Main Form -->
      <v-form ref="form">
        <v-container fluid :class="$vuetify.breakpoint.xs ? 'px-3' : 'px-15'">
          <v-row class="my-5">
            <v-col col="12" md="8">
              <!-- Product Description -->
              <v-card outlined elevation="4" class="pa-5 card-product-1">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-subheader><b>Product Name</b></v-subheader>
                    <v-text-field
                      outlined
                      dense
                      solo
                      label="Ex. Smartphone vendor - Specification"
                      clearable
                      elevation="0"
                      :rules="rules.name"
                      :error-messages="rules.errorMessages"
                      ref="name"
                      v-model="input.name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" class="margin-field">
                    <v-subheader><b>Description</b></v-subheader>
                    <div>
                      <quillEditor
                        ref="myTextEditor"
                        class="editor"
                        :rules="rules.description"
                        v-model="input.description"
                        :config="editorOption"
                      >
                      </quillEditor>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
              <!-- End Product Description -->

              <!-- Product Pricing -->
              <v-card outlined elevation="4" class="mt-5 pb-5 card-product-1">
                <v-card-title>Pricing</v-card-title>
                <v-divider></v-divider>
                <v-row class="px-5">
                  <v-col cols="6" md="6">
                    <v-subheader><b>Price</b></v-subheader>
                    <!-- <v-text-field
                      outlined
                      dense
                      solo
                      label="0.00"
                      elevation="0"
                      prefix="$"
                      :rules="rules.price"
                      v-model="input.price"
                    ></v-text-field> -->
                    <v-currency-field
                      outlined
                      dense
                      solo
                      label="0.00"
                      prefix="$"
                      :rules="rules.price"
                      v-model="input.price"
                    />
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-subheader><b>Discount</b></v-subheader>
                    <v-text-field
                      outlined
                      dense
                      solo
                      label="%"
                      elevation="0"
                      v-model="input.discount"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <!-- End Product Pricing -->

              <!-- Product Image Image -->
              <v-card outlined elevation="4" class="mt-5 pb-5 card-product-1">
                <v-card-title>Product Image</v-card-title>
                <v-divider></v-divider>
                <v-row class="px-5 pt-5">
                  <v-col cols="12" md="12">
                    <div class="px-8">
                      <v-img
                        class="my-4"
                        width="250"
                        height="260"
                        :src="imagePreview"
                        v-if="input.imageProduct"
                      />
                    </div>
                    <v-file-input
                      show-size
                      outlined
                      dense
                      accept="image/*"
                      label="Upload Product Image"
                      elevation="0"
                      prepend-icon="mdi-camera"
                      :rules="rules.image"
                      @change="updatePreview"
                      v-model="input.image"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-card>
              <!-- End Product Image -->

              <!-- Product Inventory -->
              <v-card outlined elevation="4" class="mt-5 pb-5 card-product-1">
                <v-card-title>Inventory</v-card-title>
                <v-divider></v-divider>
                <v-row class="px-5">
                  <v-col cols="6" md="6">
                    <v-subheader><b>Stock On Hand (qty)</b></v-subheader>
                    <v-text-field
                      outlined
                      dense
                      solo
                      label="0"
                      elevation="0"
                      :rules="rules.quantity"
                      v-model="input.quantity"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-subheader
                      ><b>Barcode (ISBN, UPC, GTIN, etc.)</b></v-subheader
                    >
                    <v-text-field
                      outlined
                      dense
                      solo
                      label="0"
                      elevation="0"
                      :rules="rules.barcode"
                      v-model="input.barcode"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" md="6" class="margin-field">
                    <v-subheader><b>Weight .Kg</b></v-subheader>
                    <v-text-field
                      outlined
                      dense
                      solo
                      label="0"
                      elevation="0"
                      :rules="rules.weight"
                      v-model="input.weight"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <!-- End Product Inventory -->
            </v-col>

            <v-col cols="12" md="4">
              <!-- Product Status -->
              <v-card outlined elevation="4" class="pb-5">
                <v-card-title>Product Status</v-card-title>
                <v-divider></v-divider>
                <v-row class="px-5">
                  <v-col cols="12" md="12" class="mt-5">
                    <v-select
                      label="Status"
                      :items="statusSelect"
                      dense
                      outlined
                      solo
                      :rules="rules.status"
                      v-model="input.status"
                    ></v-select>
                    <small
                      style="
                        margin-top: -20px !important;
                        position: absolute;
                        opacity: 0.9;
                      "
                      >This product will be hidden from all sales
                      channels.</small
                    >
                  </v-col>
                </v-row>
              </v-card>
              <!-- Product Status -->

              <!-- Product Organization -->
              <v-card outlined elevation="4" class="mt-5 pb-5">
                <v-card-title>Product Organization</v-card-title>
                <v-divider></v-divider>
                <v-row class="px-5">
                  <v-col cols="12" md="12">
                    <v-subheader><b>Vendor</b></v-subheader>
                    <v-text-field
                      outlined
                      dense
                      solo
                      label="Product Vendor"
                      elevation="0"
                      :rules="rules.vendor"
                      v-model="input.vendor"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12" class="margin-field">
                    <v-subheader><b>Product Category</b></v-subheader>
                    <v-select
                      label="Product Category"
                      :items="categorySelect"
                      item-text="text"
                      item-value="value"
                      dense
                      outlined
                      solo
                      :rules="rules.category"
                      v-model="input.category"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <!--  -->

          <v-divider></v-divider>
          <!-- Button Action -->

          <v-card-actions class="my-5">
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              class="text-capitalize"
              text
              dark
              x-large
              @click="closeDialog"
              >close</v-btn
            >
            <v-btn
              color="blue darken-1"
              class="text-capitalize"
              dark
              x-large
              @click="submit"
              >Save</v-btn
            >
          </v-card-actions>
        </v-container>
      </v-form>
      <!-- End Main Form -->
    </v-card>
  </v-dialog>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      content: "",
      dialogOverlay: false,
      statusSelect: ["Active", "Inactive"],
      categorySelect: [],
      imagePlaceholder: "http://via.placeholder.com/300",
      // End Data variable
    };
  },
  props: {
    addDialog: Boolean,
    input: Object,
    rules: Object,
    editorOption: Object,
  },
  components: {
    quillEditor,
  },
  computed: {
    imagePreview() {
      return this.input.imageProduct
        ? this.input.imageProduct
        : this.imagePlaceholder;
    },
  },
  methods: {
    categories() {
      this.$api
        .get("/category")
        .then((res) => {
          this.categorySelect = res.data.map((category) => {
            return {
              text: category.category_name,
              value: category.id,
            };
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    resetForm() {
      this.input.action = "create";
      this.$refs.form.validate(false);
    },
    closeDialog() {
      this.$emit("closeDialog");
      this.resetValidation();
      this.resetForm();
    },
    updatePreview(payload) {
      const file = payload;
      if (file) {
        this.input.imageProduct = URL.createObjectURL(file);
      }
    },
    submit() {
      this.dialogOverlay = true;

      let form = new FormData();
      form.append("action", this.input.action);
      form.append("id", this.input.id);
      form.append("product_name", this.input.name);
      form.append("product_content", this.input.description);
      form.append("product_price", this.input.price);
      form.append(
        "product_discount",
        this.input.discount ? this.input.discount : ""
      );
      form.append("product_image", this.input.image ? this.input.image : "");
      form.append("product_quantity", this.input.quantity);
      form.append("product_barcode", this.input.barcode);
      form.append("product_weight", this.input.weight);
      form.append("product_status", this.input.status);
      form.append("product_vendor", this.input.vendor);
      form.append("product_category", this.input.category);
      form.append("old_image", this.input.oldImage);

      this.$restrictApi
        .post("/products", form)
        .then((res) => {
          console.log(res);
          this.dialogOverlay = false;
          this.$emit("showDataTable");
          this.closeDialog();
          Swal.fire("Success!", res.data.success, "success");
        })
        .catch((err) => {
          this.dialogOverlay = false;
          console.log(err.response.data);
          alert(err.response.data.message)
          const error = err.response.data.error;
          if (error) {
            this.$refs.form.validate(true);
            this.rules.name = error.product_name;
            this.rules.price = error.product_price;
            this.rules.image = error.product_image;
            this.rules.quantity = error.product_quantity;
            this.rules.barcode = error.product_barcode;
            this.rules.weight = error.product_weight;
            this.rules.status = error.product_status;
            this.rules.vendor = error.product_vendor;
            this.rules.category = error.product_category;
          }
        });
    },
    resetValidation() {
      this.rules.name = [];
      this.rules.price = [];
      this.rules.image = [];
      this.rules.quantity = [];
      this.rules.barcode = [];
      this.rules.weight = [];
      this.rules.status = [];
      this.rules.vendor = [];
      this.rules.category = [];
    },
  }, // End methods
  mounted() {
    this.categories();
  },
};
</script>

<style>
.margin-field {
  margin-top: -40px;
}
</style>